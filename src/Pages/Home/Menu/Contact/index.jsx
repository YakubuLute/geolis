import { TextInput, Text, Textarea, SimpleGrid, Group, Title, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContactInfoList } from './contact_info';


export function ContactPage() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
  <section className="section mb-10 ">
    <div className="container">
      <div className="contact-wrapper">
        <div className="left-section pb-7">
          <Title order={3}>Contact Us</Title>
          <Text mb={"12px"}> 
          <strong>Geolis</strong> is a research project which is working towards an efficient and hustle free land search experience in Techiman, Bono East - Ghana.
          </Text>
          <ContactInfoList/>
        </div>
        <div className="right-section">
        <form onSubmit={form.onSubmit(() => {
      // alert(form.values.email)
    })}>
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
        fw={900}
        ta="center"
      >
        Get in touch
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
          label="Name"
          placeholder="Your name"
          name="name"
          variant="filled"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Email"
          placeholder="Your email"
          name="email"
          variant="filled"
          {...form.getInputProps('email')}
        />
      </SimpleGrid>

      <TextInput
        label="Subject"
        placeholder="Subject"
        mt="md"
        name="subject"
        variant="filled"
        {...form.getInputProps('subject')}
      />
      <Textarea
        mt="md"
        label="Message"
        placeholder="Your message"
        maxRows={10}
        minRows={5}
        autosize
        name="message"
        variant="filled"
        {...form.getInputProps('message')}
      />

      <Group justify="center" mt="xl" pb={"2rem"}>
        <Button type="submit" size="md">
          Send message
        </Button>
      </Group>
    </form>
        </div>
      </div>
    </div>
  </section>
  );
}