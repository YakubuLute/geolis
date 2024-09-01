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
import cld from '../../../config/claudinaryConfig'; 
import { toast } from 'react-toastify';

export function UploadLandComponent() {
  const [active, setActive] = useState(0);
  const [landDetails, setLandDetails] = useState<Partial<TLandDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof TLandDetails, value: any) => {
    setLandDetails(prev => ({ ...prev, [field]: value }));
  };

  const uploadToCloudinary = async (file: File, resourceType: 'image' | 'video') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your actual upload preset
    formData.append('cloud_name', 'dl6ibklbe');

    const response = await fetch(`https://api.cloudinary.com/v1_1/dl6ibklbe/${resourceType}/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
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

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setIsSubmitting(true);
    try {
      let imageUrls: string[] = [];
      let videoUrls: string[] = [];

      // Upload images to Cloudinary if present
      if (landDetails.images && landDetails.images.length > 0) {
        imageUrls = await Promise.all(
          (landDetails.images as File[]).map(file => uploadToCloudinary(file, 'image'))
        );
      }

      // Upload videos to Cloudinary if present
      if (landDetails.videos && landDetails.videos.length > 0) {
        videoUrls = await Promise.all(
          (landDetails.videos as File[]).map(file => uploadToCloudinary(file, 'video'))
        );
      }

      // Prepare the data to be sent to Firebase
      const landData = {
        ...landDetails,
        images: imageUrls,
        videos: videoUrls,
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
                onChange={(files) => handleInputChange('images', files)}
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
                label="Polygon Coordinates"
                placeholder="Enter polygon coordinates"
                value={landDetails.polygon?.join(', ') || ''}
                onChange={(e) => handleInputChange('polygon', e.target.value.split(', '))}
                classNames={classes}
                required
              />
              <TextInput
                label="Initial Coordinates"
                placeholder="Enter initial coordinates"
                value={landDetails.initialCood?.join(', ') || ''}
                onChange={(e) => handleInputChange('initialCood', e.target.value.split(', '))}
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
          <Button leftSection={<KeyboardBackspaceIcon size={14} />} variant="light" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 2 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </Box>
  );
}