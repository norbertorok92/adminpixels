import Head from 'next/head';
import Popconfirm from 'containers/Feedback/Popconfirm/Popconfirm';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Popconfirm</title>
    </Head>
    <DashboardLayout>
      <Popconfirm />
    </DashboardLayout>
  </>
));
