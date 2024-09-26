import { Helmet } from 'react-helmet-async';
import { MyProfileView } from 'src/sections/configuration/dashboard/view';

// ----------------------------------------------------------------------

export default function MyProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile</title>
      </Helmet>

      <MyProfileView />
    </>
  );
}
