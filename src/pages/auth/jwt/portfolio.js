import { Helmet } from 'react-helmet-async';
import { JwtPortfolioView } from 'src/sections/auth/jwt';
// sections

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title> Portfolio</title>
      </Helmet>

      <JwtPortfolioView />
    </>
  );
}
