import Head from 'next/head';
import Calendar from 'widgets/Calendar/Calendar';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';

export default () => (
  <>
    <Head>
      <title>Alert</title>
    </Head>
    <DashboardLayout>
      <Calendar />
    </DashboardLayout>
  </>
);
