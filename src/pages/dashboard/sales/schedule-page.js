import { Helmet } from 'react-helmet-async';
// sections
import { ScheduleView } from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> Sales: Schedule</title>
      </Helmet>

      <ScheduleView />
    </>
  );
}
