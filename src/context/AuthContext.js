import React, { useState, createContext, useContext, useEffect } from "react";
import { auth, db } from "../config/firebaseConfig";
import { getDoc, doc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { showToast } from '../component/shared/Toast/Hot-Toast';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

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
      showToast(successMessage);
      return result;
    } catch (err) {
      setError(err.message);
      showToast(`Error: ${err.message}`, "error");
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

      // User is registered, proceed with sign-in
      const result = await handleAsyncOperation(async () => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        updateUserProfile(userCredential.user);
        return userCredential;
      }, 'Login successful.');

      return result;
    } catch (err) {
      setError(err.message);
      showToast(`Error: ${err.message}`, 'error');
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
          console.log('Sign-in popup was closed before finalizing');
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

  const updateProfile = async (updates) => {
    if (!currentUser) {
      throw new Error("No authenticated user");
    }

    return handleAsyncOperation(async () => {
      await currentUser.updateProfile(updates);
      updateUserProfile(currentUser);
    }, "Profile updated successfully");
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
