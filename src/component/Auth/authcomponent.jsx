import React from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Box,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { TwitterButton } from './twitterbutton';
import { GoogleButton } from './googlebutton.jsx';
import {  useNavigate } from 'react-router-dom';
import classes from "./resetpassword.css";
import { ArrowBack } from '@mui/icons-material';


export function AuthenticationForm(props) {
  const navigate = useNavigate();
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Paper radius="md" p="5rem" withBorder {...props} w={"35vw"} >
         <Anchor c="dimmed" size="sm" className={classes.control} href="/" display={'flex'} style={{alignItems:"center", marginBottom:"1rem"}}>
                
                  <ArrowBack
                    style={{ width: "12px", height: "12px" }}
                    stroke={1.5}
                  />
                  <Box ml={5}>Back to Home</Box>
                
              </Anchor>
      <Text size="lg" fw={500}>
        Welcome to Geolis, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@email.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
         
        <Anchor component="button" type="button" c="dimmed" onClick={()=>navigate("/auth/reset-password")} size="xs" mt={"-12px"}>
            {type === 'login' && "Forgot password?"}
             
          </Anchor>
          
          <Button type="submit" radius="xl" fullWidth>
            {upperFirst(type)}
          </Button>
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
        </Group>
      
      </form>
    </Paper>
  );
}