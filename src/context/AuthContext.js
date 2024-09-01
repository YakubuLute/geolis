import React, { useState, createContext, useContext, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import { toast } from "react-toastify";
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

  const showToast = (message, type = "dark") => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: type,
    });
  };

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

  const signUpNewUser = (email, password) =>
    handleAsyncOperation(async () => {
      console.log("Inside auth", auth)
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateUserProfile(result.user);
      return result;
    }, "Account created successfully");

  const signInUser = (email, password) =>
    handleAsyncOperation(async () => {
      const result = await signInWithEmailAndPassword(auth, email, password);
      updateUserProfile(result.user);
      return result;
    }, "Login successful. Please wait ...");

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
      }, "Login successful. Please wait ...");

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
    updateProfile,
    setSuccessMsg,
    successMsg,
    error,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;
