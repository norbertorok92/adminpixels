import Head from 'next/head';
import Spin from 'containers/Feedback/Spin/Spin';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Spin</title>
    </Head>
    <DashboardLayout>
      <Spin />
    </DashboardLayout>
  </>
));
