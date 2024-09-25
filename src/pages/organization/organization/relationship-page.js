import { Helmet } from 'react-helmet-async';
import { RelationshipView } from 'src/sections/configuration/relationship/view';

// ----------------------------------------------------------------------

export default function OrganizationRelationshipPage() {
  return (
    <>
      <Helmet>
        <title> Organization: Relationship</title>
      </Helmet>

      <RelationshipView />
    </>
  );
}
