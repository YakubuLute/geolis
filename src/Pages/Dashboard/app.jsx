import { Helmet } from 'react-helmet-async';
import { AppView } from '../../sections/overview/view/index';

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Geolis Dashboard </title>
      </Helmet>

      <AppView />
    </>
  );
}
