import { Helmet } from 'react-helmet-async';
import { ScheduleView } from 'src/sections/schedule/view';

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> Schedule</title>
      </Helmet>

      <ScheduleView />
    </>
  );
}
