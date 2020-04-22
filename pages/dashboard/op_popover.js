import Head from 'next/head';
import Popover from 'containers/UIElements/Popover/Popover';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Popover</title>
    </Head>
    <DashboardLayout>
      <Popover />
    </DashboardLayout>
  </>
));
