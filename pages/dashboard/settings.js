import Head from 'next/head';
import Settings from 'widgets/Settings/Settings';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Settings</title>
    </Head>
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  </>
));
