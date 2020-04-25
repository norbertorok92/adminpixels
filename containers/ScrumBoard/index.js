import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import Board from './Board/Board';
import ModalRoot from './rootModal';
import DrawerRoot from './rootDrawer';
import BoardLists from './Board/BoardList/BoardList';
import CreateBoard from './Board/BoardCreateOrUpdate/BoardCreateOrUpdate';

export default function ScrumBoard() {
  return (
    <>
      <Router>
        <Route exact path="/dashboard/project" component={BoardLists} />
        <Route exact path="/dashboard/project/:id" component={CreateBoard} />
        <Route path="/dashboard/project/board/:id" component={Board} />
      </Router>
      <ModalRoot />
      <DrawerRoot />
    </>
  );
}
