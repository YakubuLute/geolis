

import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from './Illustration';
import classes from './page404.module.css';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Page Not Found</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group justify="center">
            <Button size="md"><Link to='/' className={classes.link}>
            Take me back to home page
            </Link></Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}