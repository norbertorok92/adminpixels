import Head from 'next/head';
import GoogleChart from 'containers/Charts/GoogleChart/GoogleChart';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';

export default (() => (
  <>
    <Head>
      <title>Google Chart</title>
    </Head>
    <DashboardLayout>
      <GoogleChart />
    </DashboardLayout>
  </>
));
