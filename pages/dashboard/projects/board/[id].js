import Head from 'next/head';
import Board from 'widgets/ScrumBoard/Board/Board';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';
import ModalRoot from 'widgets/ScrumBoard/rootModal';
import DrawerRoot from 'widgets/ScrumBoard/rootDrawer';

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

export default ProjectBoard