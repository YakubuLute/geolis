import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FireStoreContext = createContext();

export function useFireStoreContext() {
  return useContext(FireStoreContext);
}

export function FireStoreDataContext({ children }) {
  const auth = getAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [userData, setUserData] = useState(null);
  const [landData, setLandData] = useState([]);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [isLandDataLoading, setIsLandDataLoading] = useState(true);

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
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserDataLoading(true);
      if (user) {
        console.log("User is signed in:", user);
        setUserData(user);
        const profile = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        };
        setUserProfile(profile);
      } else {
        console.warn("User is signed out");
        setUserProfile(null);
        setUserData(null);
      }
      setIsUserDataLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const value = {
    userProfile,
    userData,
    landData,
    isLandDataLoading,
    isUserDataLoading,
  };

  return (
    <FireStoreContext.Provider value={value}>
      {children}
    </FireStoreContext.Provider>
  );
}