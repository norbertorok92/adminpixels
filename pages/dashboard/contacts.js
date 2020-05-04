import Head from 'next/head';
import Contacts from 'containers/Contacts/Contacts';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';
export default (() => (
  <>
    <Head>
      <title>Contacts</title>
    </Head>
    <DashboardLayout>
      <Contacts />
    </DashboardLayout>
  </>
));
