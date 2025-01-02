import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from '../config/firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
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
  const [selectedLand, setSelectedLand] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setIsUserDataLoading(true);
  //     if (user) {
  //       setUserData(user);
  //       const profile = {
  //         uid: user.uid,
  //         displayName: user.displayName,
  //         email: user.email,
  //         photoURL: user.photoURL,
  //         emailVerified: user.emailVerified,
  //         phoneNumber: user.phoneNumber,
  //         creationTime: user.metadata.creationTime,
  //         lastSignInTime: user.metadata.lastSignInTime,
  //       };
  //       setUserProfile(profile);
  //     } else {
  //       setUserProfile(null);
  //       setUserData(null);
  //     }
  //     setIsUserDataLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsUserDataLoading(true);
      if (user) {
        setUserData(user);

        // Create basic profile from auth
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

        try {
          // Fetch additional user data from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              // Combine auth profile with Firestore data
              const firestoreData = docSnapshot.data();
              setUserProfile({
                ...profile,
                ...firestoreData
              });
            } else {
              // If no Firestore document exists, use just the auth profile
              setUserProfile(profile);
            }
            setIsUserDataLoading(false);
          }, (error) => {
            console.error("Error fetching user data:", error);
            setUserProfile(profile);
            setIsUserDataLoading(false);
          });

          // Return cleanup function for user data listener
          return () => unsubscribeUser();
        } catch (error) {
          console.error("Error setting up user data listener:", error);
          setUserProfile(profile);
          setIsUserDataLoading(false);
        }
      } else {
        setUserProfile(null);
        setUserData(null);
        setIsUserDataLoading(false);
      }
    });

    // Return cleanup function for auth listener
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

  const handleUpdateLand = async (collectionName, documentId, updatedData) => {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, {
        ...updatedData,
        updatedAt: new Date()
      });
      showToast('Land updated successfully!');
      setOpenEdit(false);
      setSelectedLand(null);
    } catch (err) {
      console.error('Error updating land:', err);
      showErrorToast(err.message || 'Error updating document');
    }
  };

  const value = {
    userProfile,
    userData,
    landData,
    isDeleting,
    handleDeleteLand,
    handleUpdateLand,
    isLandDataLoading,
    isUserDataLoading,
    selectedLand,
    setSelectedLand,
    openEdit,
    setOpenEdit
  };

  return (
    <FireStoreContext.Provider value={value}>
      {children}
    </FireStoreContext.Provider>
  );
}

export default FireStoreContext;