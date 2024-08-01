import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import the existing auth context

const UserProfileContext = createContext();

export function useUserProfile() {
  return useContext(UserProfileContext);
}

export function UserProfileProvider({ children }) {
  const { currentUser } = useAuth(); // Use the existing auth context
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const profile = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        emailVerified: currentUser.emailVerified,
        phoneNumber: currentUser.phoneNumber,
        creationTime: currentUser.metadata.creationTime,
        lastSignInTime: currentUser.metadata.lastSignInTime,
      };
      setUserProfile(profile);
    } else {
      setUserProfile(null);
    }
  }, [currentUser]);

  const updateUserProfile = async (updates) => {
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    try {
      await updateUserInBackend(currentUser.uid, updates);
      setUserProfile(prevProfile => ({
        ...prevProfile,
        ...updates
      }));

    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error;
    }
  };

  const value = {
    userProfile,
    updateUserProfile
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

// Placeholder function - replace with actual implementation
async function updateUserInBackend(uid, updates) {
  // Implement the logic to update the user profile in your backend
  console.log(`Updating user ${uid} with`, updates);
  // Example: await firebase.firestore().collection('users').doc(uid).update(updates);
}