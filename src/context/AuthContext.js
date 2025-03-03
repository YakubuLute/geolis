import React, { useState, createContext, useContext, useEffect } from "react";
import { auth, db, storage } from "../config/firebaseConfig";
import { getDoc, doc, setDoc, serverTimestamp, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { showErrorToast, showToast } from '../component/shared/Toast/Hot-Toast';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncOperation = async (operation, successMessage) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await operation();
      setSuccessMsg(result);
      // showToast(successMessage);
      return result;
    } catch (err) {
      setError(err.message);
      // showErrorToast(`Error: ${err.message}`, "error");
      console.error("Operation failed:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async (email) => {
    try {
      // Query Firestore to find user by email
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0]; // Returns the first matching document
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = (user) => {
    if (user) {
      const profile = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      setUserProfile(profile);
    } else {
      setUserProfile(null);
    }
  };

  const signUpNewUser = async (email, password, userData) => {
    try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const signInUser = async (email, password) => {
    try {
      // Check if the user is already registered
      const userCredential = await getUser(email);
      if (!userCredential.exists()) {
        // User is not registered, throw an error or display a message
        throw new Error('User is not registered. Please sign up first.');
      }

      const result = await handleAsyncOperation(async () => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        updateUserProfile(userCredential.user);
        return userCredential;
      }, 'Login successful.');
      return result;

    } catch (err) {
      setError(err.message);
      // showErrorToast(`Error: ${err.message}`, 'error');
      console.error('Sign-in failed:', err);
      throw err;
    }
  };

  const signInUserWithGoogle = () =>
    handleAsyncOperation(async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        updateUserProfile(result.user);
        return result;
      } catch (error) {
        if (error.code === 'auth/cancelled-popup-request') {
          // console.log('Sign-in popup was closed before finalizing');
          throw new Error('The sign-in popup was closed. Please try again.');
        } else {
          throw error;
        }
      }
    }, "Login successful.");

  const signOutUser = () =>
    handleAsyncOperation(async () => {
      await signOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
    }, "Sign out successfully");

  const resetPassword = (email) =>
    handleAsyncOperation(
      () => sendPasswordResetEmail(auth, email),
      "Password reset email was sent to your address"
    );


  const updateProfile = async (newData) => {
    if (!currentUser) throw new Error('No user logged in');

    try {
      // Update auth profile (only for displayName and photoURL)
      if (newData.displayName) {
        await firebaseUpdateProfile(auth.currentUser, {
          displayName: newData.displayName
        });
      }

      // Update custom profile data in your database
      const userRef = doc(db, 'users', currentUser.uid);

      // Only include fields that are defined in newData
      const updateData = {};
      if (newData.firstName !== undefined) updateData.firstName = newData.firstName;
      if (newData.lastName !== undefined) updateData.lastName = newData.lastName;
      if (newData.displayName !== undefined) updateData.displayName = newData.displayName;

      // Check if document exists
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // If document doesn't exist, create it with initial data
        await setDoc(userRef, {
          email: currentUser.email,
          ...updateData,
          createdAt: serverTimestamp(),
        });
      } else {
        // If document exists, update it
        await updateDoc(userRef, updateData);
      }

      // Update local state
      setUserProfile(prev => ({
        ...prev,
        ...newData
      }));

      showToast("Profile updated successfully");

    } catch (error) {
      console.error('Error updating profile:', error);
      showErrorToast(`Error: ${error.message}`);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      updateUserProfile(user);
    });
    return unsubscribe;
  }, []);


  const value = {
    currentUser,
    userProfile,
    setUserProfile,
    signUpNewUser,
    signInUserWithGoogle,
    signInUser,
    signOutUser,
    resetPassword,
    getUser,
    updateProfile,
    setSuccessMsg,
    successMsg,
    error,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;
