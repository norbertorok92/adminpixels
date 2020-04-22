import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Board from './Board/Board';
import ModalRoot from './rootModal';
import DrawerRoot from './rootDrawer';
import BoardLists from './Board/BoardList/BoardList';
import CreateBoard from './Board/BoardCreateOrUpdate/BoardCreateOrUpdate';

export default function ScrumBoard() {
  // console.log('CICI', match)
  // console.log('CICI', window.location)
  // let match = useRouteMatch();
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/dashboard/scrum_board" component={BoardLists} />
          <Route exact path="/dashboard/scrum_board/:id" component={CreateBoard} />
          <Route path="/dashboard/scrum_board/project/:id" component={Board} />
        </Switch>
      </Router>
      <ModalRoot />
      <DrawerRoot />
    </>
  );
}
