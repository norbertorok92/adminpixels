import Head from 'next/head';
import BoardLists from 'widgets/ScrumBoard/Board/BoardList/BoardList';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';
import ModalRoot from 'widgets/ScrumBoard/rootModal';
import DrawerRoot from 'widgets/ScrumBoard/rootDrawer';

export default (() => (
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
