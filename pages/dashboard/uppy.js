import Head from 'next/head';
import UppyUploader from 'containers/AdvancedUI/Uppy/Uppy';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
export default withAuthSync(() => (
  <>
    <Head>
      <title>Uppy Uploader</title>
    </Head>
    <DashboardLayout>
      <UppyUploader />
    </DashboardLayout>
  </>
));
