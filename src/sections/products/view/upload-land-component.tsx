import React, { useState } from 'react';
import {
  TextInput,
  NumberInput,
  Textarea,
  FileInput,
  Stack,
  Group,
  Button,
  Box,
  Stepper,
  Paper,
  SimpleGrid,
  Progress
} from '@mantine/core';
import classes from './contained-input.module.css';
import { TLandDetails } from '../../../Types/types';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../../config/firebaseConfig';
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export function UploadLandComponent() {
  const [active, setActive] = useState(0);
  const [landDetails, setLandDetails] = useState<Partial<TLandDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleInputChange = (field: keyof TLandDetails, value: any) => {
    setLandDetails(prev => ({ ...prev, [field]: value }));
  };

  const parseCoordinates = (input: string): number[] => {
    return input.split(',').map(coord => parseFloat(coord.trim()));
  };

  const handleCoordinateChange = (field: 'initialCood' | 'polygon', value: string) => {
    if (field === 'initialCood') {
      const coords = parseCoordinates(value);
      if (coords.length === 2) {
        handleInputChange('initialCood', coords);
      } else {
        toast.error('Initial coordinates should be two numbers: latitude, longitude');
      }
    } else if (field === 'polygon') {
      const polygonPoints = value.split('|').map(parseCoordinates);
      if (polygonPoints.every(point => point.length === 2)) {
        handleInputChange('polygon', polygonPoints);
      } else {
        toast.error('Polygon coordinates should be in format: lat1,lon1|lat2,lon2|lat3,lon3...');
      }
    }
  };

  const validateFields = () => {
    const requiredFields: (keyof TLandDetails)[] = [
      'name', 'location', 'description', 'plotNumber', 'size', 'purpose',
      'security', 'documentation', 'environment', 'allodialOwnership',
      'ground', 'price', 'etaToCBD', 'defaultZooming', 'polygon', 'initialCood'
    ];

    const missingFields = requiredFields.filter(field => !landDetails[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    return true;
  };

  const handleImageUpload = async (files: File[]) => {
    if (files && files.length > 0) {
      const validFiles = files.filter(file => {
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`File ${file.name} is too large. Maximum size is 5MB.`);
          return false;
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          toast.error(`File ${file.name} is not a supported image type.`);
          return false;
        }
        return true;
      });

      const promises = validFiles.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
            },
            (error) => {
              console.error('Error uploading file:', error);
              reject(error);
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (error) {
                console.error('Error getting download URL:', error);
                reject(error);
              }
            }
          );
        });
      });

      try {
        const imageUrls = await Promise.all(promises);
        setLandDetails(prev => ({ 
          ...prev, 
          images: [...(prev.images || []), ...imageUrls] 
        }) as any);
        toast.success('Images uploaded successfully!');
      } catch (error) {
        console.error('Error uploading images:', error);
        toast.error('Failed to upload some images. Please try again.');
      } finally {
        setUploadProgress({});
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setIsSubmitting(true);
    try {
      const landData = {
        ...landDetails,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'geolis'), landData);

      toast.success('Land details uploaded successfully!');
      console.log('Document written with ID: ', docRef.id);

      setLandDetails({});
      setActive(0);
    } catch (error) {
      console.error('Error submitting land details: ', error);
      toast.error('Failed to upload land details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Box maw={600} mx="auto">
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="Basic Information" description="Enter basic land details">
          <Paper shadow="xs" p="md">
            <Stack spacing="md">
              <SimpleGrid cols={2}>
                <TextInput
                  label="Name"
                  placeholder="Land Name"
                  value={landDetails.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  classNames={classes}
                  required
                />
                <TextInput
                  label="Location"
                  placeholder="Land Location"
                  value={landDetails.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  classNames={classes}
                  required
                />
              </SimpleGrid>

              <Textarea
                label="Description"
                placeholder="Describe the land"
                value={landDetails.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                classNames={classes}
                required
              />
              {/* ... (other fields remain the same) */}
            </Stack>
          </Paper>
        </Stepper.Step>

        <Stepper.Step label="Additional Details" description="Enter additional information">
          <Paper shadow="xs" p="md">
            <SimpleGrid cols={2} spacing="md">
              {/* ... (other fields remain the same) */}
              <FileInput
                label="Images"
                placeholder="Upload land images"
                accept={ALLOWED_FILE_TYPES.join(',')}
                multiple
                onChange={(files) => handleImageUpload(files)}
                classNames={classes}
              />
              {Object.entries(uploadProgress).map(([fileName, progress]) => (
                <Progress
                  key={fileName}
                  value={progress}
                  label={`${fileName}: ${progress.toFixed(0)}%`}
                  size="sm"
                  mt="xs"
                />
              ))}
              <TextInput
                label="Initial Coordinates"
                placeholder="e.g., 51.505, -0.09"
                value={landDetails.initialCood?.join(', ') || ''}
                onChange={(e) => handleCoordinateChange('initialCood', e.target.value)}
                classNames={classes}
                required
              />
              <Textarea
                label="Polygon Coordinates"
                placeholder="e.g., 51.505,-0.09|51.51,-0.1|51.51,-0.08"
                value={landDetails.polygon?.map(point => point.join(',')).join('|') || ''}
                onChange={(e) => handleCoordinateChange('polygon', e.target.value)}
                classNames={classes}
                required
              />
            </SimpleGrid>
          </Paper>
        </Stepper.Step>

        <Stepper.Completed>
          <Paper shadow="xs" p="md">
            <Stack gap={2}>
              <h2>Form Submission Complete!</h2>
              <p>Please review your entries before final submission.</p>
              <Button onClick={handleSubmit} loading={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Land Details'}
              </Button>
            </Stack>
          </Paper>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button leftSection={<KeyboardBackspaceIcon />} variant="light" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 2 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </Box>
  );
}