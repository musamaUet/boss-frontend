import { Helmet } from 'react-helmet-async';
import { JwtAboutView } from 'src/sections/auth/jwt';
// sections

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title> About</title>
      </Helmet>

      <JwtAboutView />
    </>
  );
}
