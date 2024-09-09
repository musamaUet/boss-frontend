import { Helmet } from 'react-helmet-async';
import { JwtContactView } from 'src/sections/auth/jwt';
// sections

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title> Contact Us</title>
      </Helmet>

      <JwtContactView />
    </>
  );
}
