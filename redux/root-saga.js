import { all } from 'redux-saga/effects';
import authSagas from 'authentication/sagas';
import contactSagas from 'redux/contacts/saga';
import invoicesSagas from 'redux/invoice/saga';
import mailSagas from 'redux/mail/saga';
import notesSagas from 'redux/notes/saga';
import todosSagas from 'redux/todos/saga';
import ecommerceSaga from 'redux/ecommerce/saga';
import cardsSagas from 'redux/card/saga';
import chatSagas from 'redux/chat/sagas';
import youtubeSearchSagas from 'redux/youtubeSearch/sagas';
import githubSagas from 'redux/githubSearch/sagas';
import articles from 'redux/articles/sagas';
import investors from 'redux/investors/sagas';
import scrumBoardSaga from 'redux/scrumBoard/saga';
import quizSaga from 'redux/quiz/saga';

import profileSaga from 'redux/profile/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    contactSagas(),
    mailSagas(),
    notesSagas(),
    todosSagas(),
    ecommerceSaga(),
    cardsSagas(),
    invoicesSagas(),
    chatSagas(),
    youtubeSearchSagas(),
    articles(),
    investors(),
    scrumBoardSaga(),
    quizSaga(),
    profileSaga(),
    githubSagas(),
  ]);
}
