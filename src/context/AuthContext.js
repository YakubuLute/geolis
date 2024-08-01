import React, { useState, createContext, useContext, useEffect } from "react";
import { Auth as auth } from "./auth";
import { toast } from "react-toastify";

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
      const result = await auth.createUserWithEmailAndPassword(email, password);
      updateUserProfile(result.user);
      return result;
    }, "Account created successfully");

  const signInUser = (email, password) =>
    handleAsyncOperation(async () => {
      const result = await auth.signInWithEmailAndPassword(email, password);
      updateUserProfile(result.user);
      return result;
    }, "Login successful. Please wait ...");

  const signInUserWithGoogle = () =>
    handleAsyncOperation(async () => {
      const provider = new auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
      updateUserProfile(result.user);
      return result;
    }, "Login successful. Please wait ...");

  const signOutUser = () =>
    handleAsyncOperation(async () => {
      await auth.signOut();
      setCurrentUser(null);
      setUserProfile(null);
    }, "Sign out successfully");

  const resetPassword = (email) =>
    handleAsyncOperation(
      () => auth.sendPasswordResetEmail(email),
      "Password reset email was sent to your address"
    );

  const updateProfile = async (updates) => {
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    return handleAsyncOperation(async () => {
      await currentUser.updateProfile(updates);
      updateUserProfile(currentUser);
    }, "Profile updated successfully");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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