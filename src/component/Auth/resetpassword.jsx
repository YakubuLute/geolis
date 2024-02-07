import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
// import { IconArrowLeft } from "@tabler/icons-react";
import { ArrowBack } from "@mui/icons-material";
import classes from "./resetpassword.css";

export function ForgotPassword() {
  return (
    <section className="section forgot__password-section"
    style={{
        display:"grid",
        placeContent:"center",
        placeItems:"center",
        transform:"translateY(30%)"
    }}
    >
      <div className="container">
        <Container size={460} my={30} >
          <Title className={classes.title} ta="center">
            Forgot your password?
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Enter your email to get a reset link
          </Text>

          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <TextInput
              label="Your Email"
              placeholder="me@email.com"
              required
            />
            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Anchor c="dimmed" size="sm" className={classes.control} href="/auth">
                <Center inline>
                  <ArrowBack
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                  <Box ml={5}>Back to the login page</Box>
                </Center>
              </Anchor>
              <Button className={classes.control}>Reset password</Button>
            </Group>
          </Paper>
        </Container>
      </div>
    </section>
  );
}
