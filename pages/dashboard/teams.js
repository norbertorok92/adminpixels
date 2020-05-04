import Head from 'next/head';
import Teams from 'widgets/Teams/TeamsTable';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';

export default (() => (
  <>
    <Head>
      <title>Teams</title>
    </Head>
    <DashboardLayout>
      <Teams />
    </DashboardLayout>
  </>
));
