import { Helmet } from 'react-helmet-async';
import { UserView } from '../../sections/user/view';

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Agents | Geolis </title>
      </Helmet>

      <UserView />
    </>
  );
}
