import React, { createContext, useContext, useState, useEffect } from "react";
// import { useAuth } from "./AuthContext";
import { db } from '../config/firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { showToast, showErrorToast } from '../component/shared/Toast/Hot-Toast';
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
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteLand = async (collectionName, documentId) => {
    setIsDeleting(true);
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      showToast('Land deleted successfully!');
    } catch (err) {
      console.error('Error deleting land:', err);
      showErrorToast(err.message || 'Error deleting document');
    } finally {
      setIsDeleting(false);
    }

  };


  const value = {
    userProfile,
    userData,
    landData,
    isDeleting,
    handleDeleteLand,
    isLandDataLoading,
    isUserDataLoading,
  };

  return (
    <FireStoreContext.Provider value={value}>
      {children}
    </FireStoreContext.Provider>
  );
}