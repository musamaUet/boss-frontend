import { Helmet } from 'react-helmet-async';
// sections
import { ServicesView } from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title> Sales: Services</title>
      </Helmet>

      <ServicesView />
    </>
  );
}
