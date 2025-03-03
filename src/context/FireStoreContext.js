import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from '../config/firebaseConfig';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  addDoc,
  getDoc // Import getDoc to fetch a single document
} from 'firebase/firestore';
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
  const [allUser, setAllUser] = useState([]);
  const [isAllUserLoading, setAllUserLoading] = useState(false);


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

  // Fetch all users data 
  useEffect(() => {
    setAllUserLoading(true);
    const usersCollection = collection(db, 'users');
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setAllUser(data);
    }, (error) => {
      console.error("Error fetching users data:", error);
      setAllUserLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle auth state changes and fetch/merge user profile from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsUserDataLoading(true);
      if (user) {
        setUserData(user); // Set the Firebase Auth user data
        const profile = {
          uid: user.uid,
          displayName: user.displayName || '', // Fallback to empty string if null
          email: user.email,
          photoURL: user.photoURL || '',
          emailVerified: user.emailVerified || false,
          phoneNumber: user.phoneNumber || '', // Fallback for phone number
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        };

        try {
          // Query Firestore 'users' collection for the user with matching uid
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            // If the user exists in Firestore, merge the Firestore data with Auth data
            const firestoreData = userDocSnapshot.data();
            setUserProfile({
              ...profile,
              ...firestoreData, // Merge Firestore fields (e.g., firstName, lastName, phoneNumber, isAdmin, userName)
            });
          } else {
            // If no Firestore document exists, use only the Auth profile
            setUserProfile(profile);
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          setUserProfile(profile); // Fallback to Auth profile if Firestore query fails
        } finally {
          setIsUserDataLoading(false);
        }
      } else {
        setUserProfile(null);
        setUserData(null);
        setIsUserDataLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Existing functions (unchanged)
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

  // Function to add a new user to the 'users' collection (unchanged, but included for completeness)
  const handleAddUser = async (userData) => {
    try {
      const usersCollectionRef = collection(db, 'users');
      const docRef = await addDoc(usersCollectionRef, {
        ...userData,
        createdAt: new Date(),
        isAdmin: userData.isAdmin || false,
      });
      showToast('User added successfully!');
      return docRef.id;
    } catch (err) {
      console.error('Error adding user:', err);
      showErrorToast(err.message || 'Error adding user');
      throw err;
    }
  };

  // New function to update user data in Firestore based on Firebase Auth uid
  const handleUpdateUserProfile = async (updatedData) => {
    try {
      if (!userData || !userData.uid) {
        throw new Error('No authenticated user found');
      }

      const userDocRef = doc(db, 'users', userData.uid);
      await updateDoc(userDocRef, {
        ...updatedData,
        updatedAt: new Date(),
      });
      showToast('User profile updated successfully!');

      // Update the local state with the new data
      setUserProfile(prevProfile => ({
        ...prevProfile,
        ...updatedData,
      }));
    } catch (err) {
      console.error('Error updating user profile:', err);
      showErrorToast(err.message || 'Error updating user profile');
      throw err;
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
    setOpenEdit,
    allUser,
    isAllUserLoading,
    handleAddUser,
    handleUpdateUserProfile, 
  };

  return (
    <FireStoreContext.Provider value={value}>
      {children}
    </FireStoreContext.Provider>
  );
}

export default FireStoreContext;