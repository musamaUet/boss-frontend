import { Helmet } from 'react-helmet-async';
import { MessagesView } from 'src/sections/messages/view';

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> Messages: Dashboard</title>
      </Helmet>

      <MessagesView />
    </>
  );
}
