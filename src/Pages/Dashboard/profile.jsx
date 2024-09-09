import { Helmet } from 'react-helmet-async';
import  {ProfileView} from '../../sections/profile/view/index';

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile | Geolis </title>
      </Helmet>
      <ProfileView />
    </>
  );
}
