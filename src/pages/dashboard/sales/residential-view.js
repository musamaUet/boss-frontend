import { Helmet } from 'react-helmet-async';
// sections
import { ResidentialView } from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function ResidentialPage() {
  return (
    <>
      <Helmet>
        <title> Sales: Residential</title>
      </Helmet>

      <ResidentialView />
    </>
  );
}
