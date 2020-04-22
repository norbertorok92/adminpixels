import Head from 'next/head';
import ScrumBoard from 'containers/ScrumBoard';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>rating</title>
    </Head>
    <DashboardLayout>
      <ScrumBoard />
    </DashboardLayout>
  </>
));
