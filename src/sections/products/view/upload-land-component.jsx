import React, { useState } from "react";
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
  Progress,
} from "@mantine/core";
import classes from "./contained-input.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { showToast } from "../../../component/shared/Toast/Hot-Toast";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export function UploadLandComponent({ getIsSubmitting }) {
  const [active, setActive] = useState(0);
  const [landDetails, setLandDetails] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const [coordinateInputs, setCoordinateInputs] = useState({
    initialCood: "",
    polygon: "",
  });

  const handleInputChange = (field, value) => {
    setLandDetails((prev) => ({ ...prev, [field]: value }));
  };

  const parseCoordinates = (input) => {
    return input.split(",").map((coord) => parseFloat(coord.trim()));
  };

  const handleCoordinateChange = (field, value) => {
    setCoordinateInputs((prev) => ({ ...prev, [field]: value }));

    if (field === "initialCood") {
      const coords = parseCoordinates(value);
      if (coords.length === 2) {
        handleInputChange("initialCood", coords);
      }
    } else if (field === "polygon") {
      // Store the polygon as a string
      handleInputChange("polygon", value);
    }
  };

  const validateFields = () => {
    const requiredFields = [
      "name",
      "location",
      "description",
      "plotNumber",
      // 'size',
      "purpose",
      "security",
      "documentation",
      "environment",
      // 'allodialOwnership',
      "ground",
      "price",
      "etaToCBD",
      "defaultZooming",
      "polygon",
      "initialCood",
    ];

    const missingFields = requiredFields.filter((field) => !landDetails[field]);

    if (missingFields.length > 0) {
      showToast(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return false;
    }

    return true;
  };

  const handleImageUpload = async (files) => {
    if (files && files.length > 0) {
      const validFiles = files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          showToast(`File ${file.name} is too large. Maximum size is 3MB.`);

          return false;
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          showToast(`File ${file.name} is not a supported image type.`);
          return false;
        }
        return true;
      });

      const promises = validFiles.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));

              // showToast('Images uploaded successfully.')
            },
            (error) => {
              console.error("Error uploading file:", error);
              reject(error);
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (error) {
                console.error("Error getting download URL:", error);
                reject(error);
              }
            }
          );
        });
      });

      try {
        const imageUrls = await Promise.all(promises);
        setLandDetails((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...imageUrls],
        }));
        showToast("Images uploaded successfully.");
      } catch (error) {
        console.error("Error uploading images:", error);
        showToast("Failed to upload some images. Please try again.");
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
        initialCood: landDetails.initialCood
          ? landDetails.initialCood.join(",")
          : null,
        polygon: landDetails.polygon,
      };

      const docRef = await addDoc(collection(db, "geolis"), landData);
      showToast("Land details uploaded successfully!");

      console.log("Document written with ID: ", docRef.id);

      setLandDetails({});
      setActive(0);
    } catch (error) {
      console.error("Error submitting land details: ", error);
      showToast("Failed to upload land details. Please try again.");
    } finally {
      setIsSubmitting(false);
      getIsSubmitting(true);
    }
  };

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Box maw={600} mx="auto">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Basic Information"
          description="Enter basic land details"
        >
          <Paper shadow="xs" p="md">
            <Stack>
              <SimpleGrid cols={2}>
                <TextInput
                  label="Name"
                  placeholder="Land Name"
                  value={landDetails.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  classNames={classes}
                  required
                />
                <TextInput
                  label="Location"
                  placeholder="Land Location"
                  value={landDetails.location || ""}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  classNames={classes}
                  required
                />
              </SimpleGrid>

              <Textarea
                label="Description"
                placeholder="Describe the land"
                value={landDetails.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                classNames={classes}
                required
              />
              <TextInput
                label="Plot Number"
                placeholder="218 Block A Sector 2"
                value={landDetails.plotNumber || ""}
                onChange={(e) =>
                  handleInputChange("plotNumber", e.target.value)
                }
                classNames={classes}
                required
              />
              <NumberInput
                label="Size (acres)"
                placeholder="Land size in acres"
                value={landDetails.size || 0}
                onChange={(value) => handleInputChange("size", value)}
                classNames={classes}
              />
              <TextInput
                label="Purpose"
                placeholder="Select land purpose"
                value={landDetails.purpose || ""}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
                classNames={classes}
                required
              />
            </Stack>
          </Paper>
        </Stepper.Step>

        <Stepper.Step
          label="Additional Details"
          description="Enter additional information"
        >
          <Paper shadow="xs" p="md">
            <SimpleGrid cols={2} spacing="md">
              <TextInput
                label="Security"
                placeholder="Security details"
                value={landDetails.security || ""}
                onChange={(e) => handleInputChange("security", e.target.value)}
                classNames={classes}
                required
              />
              <TextInput
                label="Documentation"
                placeholder="e.g allocation chit"
                value={landDetails.documentation || ""}
                onChange={(e) =>
                  handleInputChange("documentation", e.target.value)
                }
                classNames={classes}
                required
              />
              <TextInput
                label="Environment"
                placeholder="e.g new site"
                value={landDetails.environment || ""}
                onChange={(e) =>
                  handleInputChange("environment", e.target.value)
                }
                classNames={classes}
                required
              />
              <TextInput
                label="Allodial Ownership"
                placeholder="e.g stool land"
                value={landDetails.allodialOwnership || ""}
                onChange={(e) =>
                  handleInputChange("allodialOwnership", e.target.value)
                }
                classNames={classes}
              />
              <TextInput
                label="Ground"
                placeholder="Ground details"
                value={landDetails.ground || ""}
                onChange={(e) => handleInputChange("ground", e.target.value)}
                classNames={classes}
                required
              />
              <NumberInput
                label="Price"
                placeholder="Land price"
                value={landDetails.price || 0}
                onChange={(value) => handleInputChange("price", value)}
                classNames={classes}
                required
              />
              <TextInput
                label="ETA to CBD"
                placeholder="Estimated time to Central Business District"
                value={landDetails.etaToCBD || ""}
                onChange={(e) => handleInputChange("etaToCBD", e.target.value)}
                classNames={classes}
                required
              />
              <NumberInput
                label="Default Zooming"
                placeholder="Default zoom level"
                value={landDetails.defaultZooming || 0}
                onChange={(value) => handleInputChange("defaultZooming", value)}
                classNames={classes}
                required
              />
              <FileInput
                label="Images"
                placeholder="Upload land images"
                accept={ALLOWED_FILE_TYPES.join(",")}
                multiple
                onChange={(files) => handleImageUpload(files)}
                classNames={classes}
              />
              {Object.entries(uploadProgress).map(([fileName, progress]) => (
                <Progress
                  key={fileName}
                  value={progress}
                  color="primary"
                  variant="determinate"
                  size="md"
                  title={`${fileName}: ${progress.toFixed(0)}%`}
                />
              ))}
              <TextInput
                label="Initial Coordinates"
                placeholder="e.g., 51.505, -0.09"
                value={coordinateInputs.initialCood}
                onChange={(e) =>
                  handleCoordinateChange("initialCood", e.target.value)
                }
                classNames={classes}
                required
              />
              <Textarea
                label="Polygon Coordinates"
                placeholder="e.g., 51.505,-0.09|51.51,-0.1|51.51,-0.08"
                value={coordinateInputs.polygon}
                onChange={(e) =>
                  handleCoordinateChange("polygon", e.target.value)
                }
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
                {isSubmitting ? "Submitting..." : "Submit Land Details"}
              </Button>
            </Stack>
          </Paper>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button
            leftSection={<KeyboardBackspaceIcon />}
            variant="light"
            onClick={prevStep}
          >
            Back
          </Button>
        )}
        {active !== 2 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </Box>
  );
}
