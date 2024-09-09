import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  Card, 
  Container, 
  Typography, 
  Avatar, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Divider 
} from '@mui/material';
import Scrollbar from '../../../component/Dashboard/scrollbar';

export default function ProfileView() {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return (
      <Container>
        <Typography variant="h6">Please log in to view your profile.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Card sx={{ p: 3 }}>
        <Scrollbar>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={userProfile?.photoURL}
              alt={userProfile?.displayName}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h5">{userProfile?.displayName}</Typography>
          </Box>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary="Email" secondary={userProfile?.email} />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Email Verified" 
                secondary={userProfile?.emailVerified ? 'Yes' : 'No'} 
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="User ID" secondary={userProfile?.uid} />
            </ListItem>
          </List>
        </Scrollbar>
      </Card>
    </Container>
  );
}