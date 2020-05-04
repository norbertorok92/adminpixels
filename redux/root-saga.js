import { all } from 'redux-saga/effects';
import contactSagas from 'redux/contacts/saga';
import notesSagas from 'redux/notes/saga';
import todosSagas from 'redux/todos/saga';
import cardsSagas from 'redux/card/saga';
import githubSagas from 'redux/githubSearch/sagas';
import scrumBoardSaga from 'redux/scrumBoard/saga';
import quizSaga from 'redux/quiz/saga';

import profileSaga from 'redux/profile/saga';

export default function* rootSaga(getState) {
  yield all([
    contactSagas(),
    notesSagas(),
    todosSagas(),
    cardsSagas(),
    scrumBoardSaga(),
    quizSaga(),
    profileSaga(),
    githubSagas(),
  ]);
}
