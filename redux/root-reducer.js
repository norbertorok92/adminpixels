import { combineReducers } from 'redux';
import App from 'redux/app/reducer';
import Calendar from 'redux/calendar/reducer';
import Box from 'redux/box/reducer';
import Notes from 'redux/notes/reducer';
import Todos from 'redux/todos/reducer';
import Contacts from 'redux/contacts/reducer';
import Cards from 'redux/card/reducer';
import DynamicChartComponent from 'redux/dynamicEchart/reducer';
import ThemeSwitcher from 'redux/themeSwitcher/reducer';
import LanguageSwitcher from 'redux/languageSwitcher/reducer';
import scrumBoard from 'redux/scrumBoard/reducer';
import drawer from 'redux/drawer/reducer';
import modal from 'redux/modal/reducer';
import quiz from 'redux/quiz/reducer';
import profile from 'redux/profile/reducer';
import githubSearch from 'redux/githubSearch/reducers';

export default combineReducers({
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Calendar,
  Box,
  Notes,
  Todos,
  Contacts,
  Cards,
  DynamicChartComponent,
  scrumBoard,
  modal,
  quiz,
  drawer,
  profile,
  githubSearch,
});
