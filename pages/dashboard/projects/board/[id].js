import Head from 'next/head';
import Board from 'containers/ScrumBoard/Board/Board';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
import ModalRoot from 'containers/ScrumBoard/rootModal';
import DrawerRoot from 'containers/ScrumBoard/rootDrawer';

import { useRouter } from 'next/router'

const ProjectBoard = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <Head>
        <title>Project Board {id}</title>
      </Head>
      <DashboardLayout>
        <Board boardId={id} />
        <ModalRoot />
        <DrawerRoot />
      </DashboardLayout>
    </>
  )
};

export default withAuthSync(ProjectBoard)