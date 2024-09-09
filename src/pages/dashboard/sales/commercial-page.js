import { Helmet } from 'react-helmet-async';
// sections
import { CommercialView } from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> Sales: Commercial</title>
      </Helmet>

      <CommercialView />
    </>
  );
}
