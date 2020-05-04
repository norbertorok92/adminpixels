import Head from 'next/head';
import Notes from 'widgets/Note/Note';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';

export default (() => (
  <>
    <Head>
      <title>Notes</title>
    </Head>
    <DashboardLayout>
      <Notes />
    </DashboardLayout>
  </>
));
