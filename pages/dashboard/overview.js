import Head from 'next/head';
import Overview from 'widgets/Overview';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Overview</title>
    </Head>
    <DashboardLayout>
      <Overview />
    </DashboardLayout>
  </>
));
