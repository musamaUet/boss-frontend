import { Helmet } from 'react-helmet-async';
import { PaymentView } from 'src/sections/payments/view';

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> Payment</title>
      </Helmet>

      <PaymentView />
    </>
  );
}
