import { combineReducers } from 'redux';
import Auth from 'authentication/reducer';
import App from 'redux/app/reducer';
import Mails from 'redux/mail/reducer';
import Calendar from 'redux/calendar/reducer';
import Box from 'redux/box/reducer';
import Notes from 'redux/notes/reducer';
import Todos from 'redux/todos/reducer';
import Contacts from 'redux/contacts/reducer';
import Cards from 'redux/card/reducer';
import Chat from 'redux/chat/reducers';
import DynamicChartComponent from 'redux/dynamicEchart/reducer';
import Ecommerce from 'redux/ecommerce/reducer';
import ThemeSwitcher from 'redux/themeSwitcher/reducer';
import Invoices from 'redux/invoice/reducer';
import LanguageSwitcher from 'redux/languageSwitcher/reducer';
import YoutubeSearch from 'redux/youtubeSearch/reducers';
import Articles from 'redux/articles/reducers';
import Investors from 'redux/investors/reducers';
import scrumBoard from 'redux/scrumBoard/reducer';
import drawer from 'redux/drawer/reducer';
import modal from 'redux/modal/reducer';
import quiz from 'redux/quiz/reducer';
import profile from 'redux/profile/reducer';
import githubSearch from 'redux/githubSearch/reducers';

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Mails,
  Calendar,
  Box,
  Notes,
  Todos,
  Contacts,
  Cards,
  Chat,
  DynamicChartComponent,
  Ecommerce,
  Invoices,
  YoutubeSearch,
  Articles,
  Investors,
  scrumBoard,
  modal,
  quiz,
  drawer,
  profile,
  githubSearch,
});
