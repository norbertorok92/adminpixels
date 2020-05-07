import { combineReducers } from 'redux';
import App from 'redux/app/reducer';
import quiz from 'redux/quiz/reducer';
import githubSearch from 'redux/githubSearch/reducers';

export default combineReducers({
  App,
  quiz,
  githubSearch,
});
