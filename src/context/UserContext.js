import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';

const UserProfileContext = createContext();

export function useUserProfile() {
  return useContext(UserProfileContext);
}

export function UserContext({ children }) {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [userData, setUserData] = useState([]);
  const [landData, setLandData] = useState([]);

  // Effect for user data
  useEffect(() => {
    // if (!currentUser) return; // Only fetch data if user is authenticated
    const usersCollectionRef = collection(db, 'users');
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUserData(data);
    }, (error) => {
      console.error("Error fetching user data:", error);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [currentUser]);


  useEffect(() => {
    // if (!currentUser) return; // Only fetch data if user is authenticated

    const landCollectionRef = collection(db, 'geolis'); // Change 'lands' to your actual collection name
    const unsubscribe = onSnapshot(landCollectionRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setLandData(data);
    }, (error) => {
      console.error("Error fetching land data:", error);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [currentUser]);


  useEffect(() => {
    console.log("User information updated:", userData);
  }, [userData]);

  useEffect(() => {
    console.log("Land information updated:", landData);
  }, [landData]);

  // Effect to set user profile
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
      throw new Error("No authenticated user");
    }

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, updates);
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        ...updates,
      }));
    } catch (error) {
      console.error("Failed to update user profile:", error);
      throw error;
    }
  };

  const value = {
    userProfile,
    updateUserProfile,
    userData,
    landData,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}