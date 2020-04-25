import Head from 'next/head';
import BoardLists from 'containers/ScrumBoard/Board/BoardList/BoardList';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
import ModalRoot from 'containers/ScrumBoard/rootModal';
import DrawerRoot from 'containers/ScrumBoard/rootDrawer';

export default withAuthSync(() => (
  <>
    <Head>
      <title>Project Boards</title>
    </Head>
    <DashboardLayout>
      <BoardLists />
      <ModalRoot />
      <DrawerRoot />
    </DashboardLayout>
  </>
));
