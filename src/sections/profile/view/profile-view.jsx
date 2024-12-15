import React from "react";
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
} from "@mui/material";
import Scrollbar from "../../../component/Dashboard/scrollbar";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

export default function ProfileView() {
  const { userProfile } = useAuth();
  const theme = useTheme();

  if (!userProfile) {
    return (
      <Container>
        <Typography variant="h6">
          Please log in to view your profile.
        </Typography>
      </Container>
    );
  }

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
            <Avatar
              src={userProfile?.photoURL}
              alt={userProfile?.displayName}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: `4px solid ${theme.palette.background.paper}`,
                boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            />
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
              }}
            >
              <BadgeIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <ListItemText
                primary={
                  <Typography variant="subtitle2">First Name</Typography>
                }
                secondary={userProfile?.firstName || "Not provided"}
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
              <BadgeIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <ListItemText
                primary={<Typography variant="subtitle2">Last Name</Typography>}
                secondary={userProfile?.lastName || "Not provided"}
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
              <PersonIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <ListItemText
                primary={<Typography variant="subtitle2">Username</Typography>}
                secondary={userProfile?.displayName || "Not provided"}
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
    </Container>
  );
}
