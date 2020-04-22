import Head from 'next/head';
import Radiobox from 'containers/Forms/Radiobox/Radiobox';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Radiobox</title>
    </Head>
    <DashboardLayout>
      <Radiobox />
    </DashboardLayout>
  </>
));
