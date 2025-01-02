import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Card,
  Container,
  Typography,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  alpha,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Scrollbar from "../../../component/Dashboard/scrollbar";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import EditIcon from "@mui/icons-material/Edit";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditDialog = React.memo(
  ({ open, onClose, formData, onInputChange, onSubmit }) => (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      disableEscapeKeyDown
      sx={{ "& .MuiDialog-paper": { width: "80%", maxWidth: 600 } }}
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.firstName}
            onChange={onInputChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderWidth: "1px",
                  borderRadius: "8px",
                  borderColor: "grey.300",
                },
                borderBottom: "1px solid",
                borderColor: "grey.300",
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused fieldset": {
                  border: "1px",
                  boxShadow: (theme) =>
                    `0 0 8px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.lastName}
            onChange={onInputChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderWidth: "1px",
                  borderRadius: "8px",
                  borderColor: "grey.300",
                },
                borderBottom: "1px solid",
                borderColor: "grey.300",
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused fieldset": {
                  border: "1px",
                  boxShadow: (theme) =>
                    `0 0 8px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="displayName"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.displayName}
            onChange={onInputChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderWidth: "1px",
                  borderRadius: "8px",
                  borderColor: "grey.300",
                },
                borderBottom: "1px solid",
                borderColor: "grey.300",
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused fieldset": {
                  border: "1px",
                  boxShadow: (theme) =>
                    `0 0 8px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
);

export default function ProfileView() {
  const { userProfile, updateProfile, setUserProfile } = useAuth();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    displayName: userProfile?.displayName || "",
  });
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data from Firestore
        try {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            // Combine auth user data with Firestore data
            setUserProfile({
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
              ...docSnap.data(),
            });
          } else {
            // If no Firestore document exists, just use auth data
            setUserProfile({
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserProfile(null);
      }
    });

    return unsubscribe;
  }, []);

  if (!userProfile) {
    return (
      <Container>
        <Typography variant="h6">
          Please log in to view your profile.
        </Typography>
      </Container>
    );
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setFormData({
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      displayName: userProfile?.displayName || "",
    });
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newState = {
        ...prev,
        [name]: value,
      };
      return newState;
    });
  };

  const handleSubmit = async () => {
    try {
      await updateProfile(formData);
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const EditButton = () => (
    <Button
      variant="contained"
      startIcon={<EditIcon />}
      onClick={handleOpenDialog}
      sx={{
        mt: 2,
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
      }}
    >
      Edit Profile
    </Button>
  );

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Create a reference to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `profile-pictures/${userProfile.uid}`);

      // Upload the file
      await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update the user profile with the new photo URL
      await updateProfile({
        photoURL: downloadURL,
      });

      // Optional: Show success message
    } catch (error) {
      console.error("Error updating profile picture:", error);
      // Optional: Show error message to user
    }
  };

  return (
    <Container maxWidth="md">
      <Card
        sx={{
          p: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.light,
            0.1
          )} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          backdropFilter: "blur(4px)",
          boxShadow: `0 8px 2px 0 ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Scrollbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={userProfile?.photoURL}
                alt={userProfile?.displayName}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 0 20px ${alpha(
                    theme.palette.primary.main,
                    0.2
                  )}`,
                }}
              />
              <Button
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: -10,
                  minWidth: "35px",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  padding: 0,
                  backgroundColor: theme.palette.background.paper,
                  "&:hover": {
                    backgroundColor: theme.palette.grey[200],
                  },
                }}
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
                <EditIcon fontSize="small" />
              </Button>
            </Box>
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {userProfile?.displayName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {userProfile?.email}
            </Typography>
            <EditButton />
          </Box>

          <Divider sx={{ mb: 4 }} />

          <List sx={{ px: 2 }}>
            <ListItem
              sx={{
                mb: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{ display: "flex", width: "100%", alignItems: "center" }}
              >
                <BadgeIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">First Name</Typography>
                  }
                  secondary={userProfile?.firstName || "Not provided"}
                />
                <Button
                  size="small"
                  onClick={() => {
                    setEditingField(
                      editingField === "firstName" ? null : "firstName"
                    );
                    setEditValue(userProfile?.firstName || "");
                  }}
                >
                  {editingField === "firstName" ? "Cancel" : "Edit"}
                </Button>
              </Box>

              {editingField === "firstName" && (
                <Box sx={{ width: "100%", mt: 1, pl: 5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Enter first name"
                    sx={{ backgroundColor: "background.paper" }}
                  />
                  <Box sx={{ mt: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={async () => {
                        console.log("Updating firstName to:", editValue); // Debug log
                        try {
                          await updateProfile({
                            firstName: editValue,
                          });
                          setEditingField(null);
                        } catch (error) {
                          console.error("Error updating firstName:", error);
                        }
                      }}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              )}
            </ListItem>

            <ListItem
              sx={{
                mb: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{ display: "flex", width: "100%", alignItems: "center" }}
              >
                <BadgeIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">Last Name</Typography>
                  }
                  secondary={userProfile?.lastName || "Not provided"}
                />
                <Button
                  size="small"
                  onClick={() => {
                    setEditingField(
                      editingField === "lastName" ? null : "lastName"
                    );
                    setEditValue(userProfile?.lastName || "");
                  }}
                >
                  {editingField === "lastName" ? "Cancel" : "Edit"}
                </Button>
              </Box>

              {editingField === "lastName" && (
                <Box sx={{ width: "100%", mt: 1, pl: 5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Enter last name"
                    sx={{ backgroundColor: "background.paper" }}
                  />
                  <Box sx={{ mt: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={async () => {
                        try {
                          await updateProfile({
                            lastName: editValue,
                          });
                          setEditingField(null);
                        } catch (error) {
                          console.error("Error updating lastName:", error);
                        }
                      }}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              )}
            </ListItem>

            <ListItem
              sx={{
                mb: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{ display: "flex", width: "100%", alignItems: "center" }}
              >
                <PersonIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">Username</Typography>
                  }
                  secondary={userProfile?.displayName || "Not provided"}
                />
                <Button
                  size="small"
                  onClick={() => {
                    setEditingField(
                      editingField === "displayName" ? null : "displayName"
                    );
                    setEditValue(userProfile?.displayName || "");
                  }}
                >
                  {editingField === "displayName" ? "Cancel" : "Edit"}
                </Button>
              </Box>

              {editingField === "displayName" && (
                <Box sx={{ width: "100%", mt: 1, pl: 5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Enter username"
                    sx={{ backgroundColor: "background.paper" }}
                  />
                  <Box sx={{ mt: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={async () => {
                        console.log("Updating displayName to:", editValue); // Debug log
                        try {
                          await updateProfile({
                            displayName: editValue,
                          });
                          setEditingField(null);
                        } catch (error) {
                          console.error("Error updating displayName:", error);
                        }
                      }}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              )}
            </ListItem>

            <ListItem
              sx={{
                mb: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                },
              }}
            >
              <EmailIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <ListItemText
                primary={<Typography variant="subtitle2">Email</Typography>}
                secondary={userProfile?.email}
              />
            </ListItem>

            <ListItem
              sx={{
                mb: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                },
              }}
            >
              <VerifiedIcon
                sx={{
                  mr: 2,
                  color: userProfile?.emailVerified
                    ? "success.main"
                    : "error.main",
                }}
              />
              <ListItemText
                primary={
                  <Typography variant="subtitle2">
                    Email Verification
                  </Typography>
                }
                secondary={
                  userProfile?.emailVerified ? "Verified" : "Not Verified"
                }
              />
            </ListItem>

            <ListItem
              sx={{
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                },
              }}
            >
              <FingerprintIcon
                sx={{ mr: 2, color: theme.palette.primary.main }}
              />
              <ListItemText
                primary={<Typography variant="subtitle2">User ID</Typography>}
                secondary={userProfile?.uid}
              />
            </ListItem>
          </List>
        </Scrollbar>
      </Card>
      <EditDialog
        open={openDialog}
        onClose={handleCloseDialog}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
