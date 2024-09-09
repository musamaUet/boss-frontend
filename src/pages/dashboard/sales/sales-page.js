import { Helmet } from 'react-helmet-async';
import { SalesView } from 'src/sections/sales/view';
// sections

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> Sales: Home</title>
      </Helmet>

      <SalesView />
    </>
  );
}
