import Head from 'next/head';
import Members from 'widgets/Members';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Members</title>
    </Head>
    <DashboardLayout>
      <Members />
    </DashboardLayout>
  </>
));
