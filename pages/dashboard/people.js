import Head from 'next/head';
import People from 'widgets/People/People';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';

export default (() => (
  <>
    <Head>
      <title>People</title>
    </Head>
    <DashboardLayout>
      <People />
    </DashboardLayout>
  </>
));
