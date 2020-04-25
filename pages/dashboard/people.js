import Head from 'next/head';
import People from 'widgets/People/People';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>People</title>
    </Head>
    <DashboardLayout>
      <People />
    </DashboardLayout>
  </>
));
