import { useState, createContext, useContext, useEffect } from "react";

// import { auth } from "../component/Auth/firebaseConfig";
import { toast } from "react-toastify";
import { Auth as auth } from "./auth";

// declare variables to hold UI context and state
const AuthUIContext = createContext();
const LoginUIStateConsumer = AuthUIContext.Consumer;

export const LoginUIStateProvider = ({ children }) => {
  const [logInUIActive, setUIActive] = useState(false);
  // console.log("LoginUIActive ", logInUIActive);
  const values = {
    logInUIActive,
    setUIActive,
  };
  return (
    <AuthUIContext.Provider value={values}>{children}</AuthUIContext.Provider>
  );
};

// export UI Context
export { AuthUIContext, LoginUIStateConsumer };

//context for authentication
export const AuthContext = createContext();

// export

export function useAuth() {
  return useContext(AuthContext);
}
//AuthProvider Function
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserID, setCurrentUserID] = useState();
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  //singup function to push email and password to the BD
  const signUpNewUser = async (email, password) => {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((successMsg) => {
        setIsLoading(() => true);
        console.log("Success Msg: ", successMsg);
        toast("Account created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setSuccessMsg(() => successMsg);
        // redirect user to login page
      })
      .catch((errorMsg) => {
        console.log("Failed to create an account: ", errorMsg);
        setError(() => errorMsg);
        toast("Failed to create an account", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  // signIn user with email and password
  const signInUser = async (email, password) => {
    return await auth
      .signInWithEmailAndPassword(email, password)
      .then((successMsg) => {
        setIsLoading(() => true);
        setSuccessMsg(() => successMsg);
        toast("Login successful. Please wait ...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("Success Msg: ", successMsg);
        // redirect user to homepage

        // browserHistory.push('/profile');
      })
      .catch((errorMsg) => {
        console.log("Failed to signin: ", errorMsg);
        setError(() => errorMsg);
        toast(`Failed to signin. Reason: { ${errorMsg.code}}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  // signIn user gmail
  const signInUserWithGoogle = async () => {
    return auth
      .signInWithPopup()
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setIsLoading(() => true);
        setSuccessMsg(() => result);
        toast("Login successful. Please wait ...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("Success Msg: ", user);
        // redirect user to homepage
      })
      .catch((errorMsg) => {
        const errorCode = errorMsg.code;
        const errorMessage = errorMsg.message;
        // The email of the user's account used.
        console.log("Failed to signin: ", errorMsg);
        setError(() => errorMsg);
        toast(`Failed to signin. Reason: { ${errorMessage}}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
  // sign Out user
  async function signOutUser() {
    return await auth
      .signOut()
      .then((successMsg) => {
        setSuccessMsg(() => successMsg);
        console.log(successMsg, "You've logout successfully");
        toast("Sign out successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        document.location.reload();
        // redirect user to homePage
      })
      .catch((errorMsg) => {
        console.log("Failed to sign out: ", errorMsg);
        setError(() => errorMsg);
        toast("Failed to sign out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  // reset password
  const resetPassword = async (email) => {
    return await auth
      .sendPasswordResetEmail()
      .then((successMsg) => {
        setSuccessMsg(() => successMsg);
        toast("Password reset was sent your email address", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // redirect user to login
        // display a message to the user that password has been reset
        console.log("Reset Password: ", successMsg);
      })
      .catch((errorMsg) => {
        console.log("Failed to reset password: ", errorMsg);
        toast(
          "Sorry, your password reset was unsuccessful. Please try again later",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setError(() => errorMsg);
      });
  };
  // check the state of the current user
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setIsLoading(false);
  //       setCurrentUser(() => user);
  //       setCurrentUserID(() => user.uid);
  //       //console.log(user);
  //       // info of user
  //       var displayName = user.displayName;
  //       var email = user.email;
  //       var emailVerified = user.emailVerified;
  //       var photoURL = user.photoURL;
  //       var isAnonymous = user.isAnonymous;
  //       var uid = user.uid;
  //       var providerData = user.providerData;
  //     } else {
  //       console.log("User is not logged in");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);


  const values = {
    currentUser,
    currentUserID,
    signUpNewUser,
    signInUserWithGoogle,
    signInUser,
    signOutUser,
    resetPassword,
    setSuccessMsg,
    successMsg,
    error,
    isLoading,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
export const AuthConsumer = AuthContext.Consumer;
