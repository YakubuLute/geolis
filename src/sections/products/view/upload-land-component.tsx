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
  SimpleGrid
} from '@mantine/core';
import classes from './contained-input.module.css';
import { TLandDetails } from '../../../Types/types';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { toast } from 'react-toastify';

export function UploadLandComponent() {
  const [active, setActive] = useState(0);
  const [landDetails, setLandDetails] = useState<Partial<TLandDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (files: File[]) => {
    try {
      const base64Images = await Promise.all(files.map(convertToBase64));
      handleInputChange('images', base64Images);
    } catch (error) {
      console.error('Error converting images to base64:', error);
      toast.error('Failed to process images. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setIsSubmitting(true);
    try {
      // Prepare the data to be sent to Firebase
      const landData = {
        ...landDetails,
        createdAt: new Date(),
      };

      // Add the document to Firestore
      const docRef = await addDoc(collection(db, 'geolis'), landData);

      toast.success('Land details uploaded successfully!');
      console.log('Document written with ID: ', docRef.id);

      // Reset the form or navigate to another page
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
              <TextInput
                label="Plot Number"
                placeholder="218 Block A Sector 2"
                value={landDetails.plotNumber || ''}
                onChange={(e) => handleInputChange('plotNumber', e.target.value)}
                classNames={classes}
                required
              />
              <NumberInput
                label="Size (acres)"
                placeholder="Land size in acres"
                value={landDetails.size || 0}
                onChange={(value) => handleInputChange('size', value)}
                classNames={classes}
                required
              />
              <TextInput
                label="Purpose"
                placeholder="Select land purpose"
                value={landDetails.purpose || ''}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                classNames={classes}
                required
              />
            </Stack>
          </Paper>
        </Stepper.Step>

        <Stepper.Step label="Additional Details" description="Enter additional information">
          <Paper shadow="xs" p="md">
            <SimpleGrid cols={2} spacing="md">
              <TextInput
                label="Security"
                placeholder="Security details"
                value={landDetails.security || ''}
                onChange={(e) => handleInputChange('security', e.target.value)}
                classNames={classes}
                required
              />
              <TextInput
                label="Documentation"
                placeholder="e.g allocation chit"
                value={landDetails.documentation || ''}
                onChange={(e) => handleInputChange('documentation', e.target.value)}
                classNames={classes}
                required
              />
              <TextInput
                label="Environment"
                placeholder="e.g new site"
                value={landDetails.environment || ''}
                onChange={(e) => handleInputChange('environment', e.target.value)}
                classNames={classes}
                required
              />
              <TextInput
                label="Allodial Ownership"
                placeholder="e.g stool land"
                value={landDetails.allodialOwnership || ''}
                onChange={(e) => handleInputChange('allodialOwnership', e.target.value)}
                classNames={classes}
                required
              />
              <TextInput
                label="Ground"
                placeholder="Ground details"
                value={landDetails.ground || ''}
                onChange={(e) => handleInputChange('ground', e.target.value)}
                classNames={classes}
                required
              />
              <NumberInput
                label="Price"
                placeholder="Land price"
                value={landDetails.price || 0}
                onChange={(value) => handleInputChange('price', value)}
                classNames={classes}
                required
              />
              <TextInput
                label="ETA to CBD"
                placeholder="Estimated time to Central Business District"
                value={landDetails.etaToCBD || ''}
                onChange={(e) => handleInputChange('etaToCBD', e.target.value)}
                classNames={classes}
                required
              />
              <NumberInput
                label="Default Zooming"
                placeholder="Default zoom level"
                value={landDetails.defaultZooming || 0}
                onChange={(value) => handleInputChange('defaultZooming', value)}
                classNames={classes}
                required
              />
              <FileInput
                label="Images (optional)"
                placeholder="Upload land images"
                accept="image/*"
                multiple
                onChange={(files) => handleImageUpload(files)}
                classNames={classes}
              />
              <FileInput
                label="Videos (optional)"
                placeholder="Upload land videos"
                accept="video/*"
                multiple
                onChange={(files) => handleInputChange('videos', files)}
                classNames={classes}
              />
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