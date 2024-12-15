import React from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Box,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "./googlebutton.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext.js";
import { showErrorToast, showToast } from "../shared/Toast/Hot-Toast.jsx";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebaseConfig.js";

export function AuthenticationForm(props) {
  const navigate = useNavigate();
  const {
    signUpNewUser,
    signInUser,
    signInUserWithGoogle,
    signOutUser,
    getUser,
  } = useAuth();

  const ADMIN_EMAILS = [
    "saaqib56@gmail.com",
    "younlutabey@gmail.com",
    "yakubulute@outlook.com",
  ];

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      org: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => {
        if (type === "login")
          return val.length < 1 ? "Password is required" : null;
        return val.length < 8
          ? "Password must be at least 8 characters long"
          : !/\d/.test(val)
          ? "Password must include at least one number"
          : !/[a-z]/.test(val)
          ? "Password must include at least one lowercase letter"
          : !/[A-Z]/.test(val)
          ? "Password must include at least one uppercase letter"
          : null;
      },
      confirmPassword: (val, values) =>
        type === "register" && val !== values.password
          ? "Passwords do not match"
          : null,
      name: (val) =>
        type === "register" && val.length < 2
          ? "Name must have at least 2 characters"
          : null,
      terms: (val) =>
        type === "register" && !val
          ? "You must accept the terms and conditions"
          : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      if (type === "register") {
        if (values.terms) {
          // Create authentication user
          const userCredential = await signUpNewUser(
            values.email,
            values.password
          );

          // Store additional user data in Firestore
          const userRef = doc(db, "users", userCredential.user.uid);
          await setDoc(userRef, {
            name: values.name,
            email: values.email,
            organization: values.org,
            isAdmin: ADMIN_EMAILS.includes(values.email),
            createdAt: serverTimestamp(),
          });

          showToast("Account created successfully.");
          toggle();
        } else {
          showToast("Please accept the terms and conditions to sign up.");
        }
      } else {
        const userDoc = await getUser(values.email);
        if (!userDoc.exists()) {
          showErrorToast("User is not registered. Please sign up first.");
          return;
        }
        await signInUser(values.email, values.password);
        showToast("Login successful. Redirecting to dashboard...");
        navigate("/dashboard");
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInUserWithGoogle();
      const user = result.user;

      if (!ADMIN_EMAILS.includes(user.email)) {
        showErrorToast(
          "Access denied! Only authorized admins can use this application."
        );
        await signOutUser();
        return;
      }

      showToast(`Welcome, ${user.displayName || user.email}!`);
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        showErrorToast("The sign-in popup was closed. Please try again.");
      } else {
        showErrorToast("Google sign-in failed. Please try again.");
      }
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props} w={"35vw"}>
      <Anchor
        c="dimmed"
        size="sm"
        href="/"
        display={"flex"}
        style={{ alignItems: "center", marginBottom: "1rem" }}
      >
        <ArrowBack style={{ width: "12px", height: "12px" }} stroke={1.5} />
        <Box ml={5}>Back to Home</Box>
      </Anchor>
      <Text size="lg" fw={500}>
        Welcome to Geolis, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={handleGoogleSignIn}>
          {type === "register" ? "Sign up" : "Sign in"} with Google
        </GoogleButton>
      </Group>

      <Divider
        label="Or continue with email and password"
        labelPosition="center"
        my="lg"
      />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === "register" && (
            <>
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                error={form.errors.name}
                radius="md"
              />
              <TextInput
                required
                label="Organization"
                placeholder="Lands Commissions"
                value={form.values.org}
                onChange={(event) =>
                  form.setFieldValue("org", event.currentTarget.value)
                }
                error={form.errors.org}
                radius="md"
              />
            </>
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@example.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            radius="md"
          />

          {type === "register" && (
            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm your password"
              value={form.values.confirmPassword}
              onChange={(event) =>
                form.setFieldValue("confirmPassword", event.currentTarget.value)
              }
              error={form.errors.confirmPassword}
              radius="md"
            />
          )}

          {type === "register" && (
            <Checkbox
              label="I accept the terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
              error={form.errors.terms}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>

          {type === "login" && (
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => navigate("/auth/reset-password")}
              size="xs"
            >
              Forgot password?
            </Anchor>
          )}

          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
