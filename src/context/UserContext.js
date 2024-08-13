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
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [isLandDataLoading, setIsLandDataLoading] = useState(true);

  // Effect for user data
  useEffect(() => {
    setIsLandDataLoading(true);
    const landCollectionRef = collection(db, 'geolis');
    const unsubscribe = onSnapshot(landCollectionRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setLandData(data);
      setIsLandDataLoading(false);
    }, (error) => {
      console.error("Error fetching land data:", error);
      setIsLandDataLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    setIsUserDataLoading(true);
    const usersCollectionRef = collection(db, 'users');
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUserData(data);
      setIsUserDataLoading(false);
    }, (error) => {
      console.error("Error fetching user data:", error);
      setIsUserDataLoading(false);
    });

    return () => unsubscribe();
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
    isLandDataLoading,
    isUserDataLoading,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}