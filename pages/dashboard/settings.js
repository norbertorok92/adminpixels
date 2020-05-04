import Head from 'next/head';
import Settings from 'widgets/Settings/Settings';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';

export default (() => (
  <>
    <Head>
      <title>Settings</title>
    </Head>
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  </>
));
