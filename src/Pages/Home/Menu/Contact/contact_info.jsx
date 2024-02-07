import { Text, Box, Stack, rem } from '@mantine/core';
// import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';

import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import classes from './contactinfo.css';


function ContactInfo({ icon: Icon, title, description, ...others }) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: 'Email', description: 'info@geolis.com', icon: AlternateEmailOutlinedIcon },
  { title: 'Phone', description: '+233 (55) 901 8865', icon: LocalPhoneOutlinedIcon },
  { title: 'Address', description: 'Techiman, Bono East Region', icon: FmdGoodOutlinedIcon },
  { title: 'Working hours', description: '24 Hour Service', icon: WbSunnyOutlinedIcon },
];

export function ContactInfoList() {
  const items = MOCKDATA.map((item, index) => <ContactInfo key={index} {...item} />);
  return <Stack >{items}</Stack>;
}