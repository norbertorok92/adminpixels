import React from 'react';
import { useSelector } from 'react-redux';
import ReactDrawer from 'react-motion-drawer';
import Scrollbars from 'components/utility/customScrollBar';
import { InputSearch } from 'components/uielements/input';
import mailList from 'components/Mail/MailList';
import mailBuckets from 'components/Mail/MailBuckets';
import mailTags from 'components/Mail/MailTags';
import singleMail from 'components/Mail/SingleMail';
import ComposeBtn from 'components/Mail/MailComposeBtn';
import ComposeMail from 'components/Mail/ComposeMail';
import mailActions from 'redux/mail/actions';
import PaginationControl from 'components/Mail/MailPagination';
import IntlMessages from 'components/utility/intlMessages';
import mailSelector from 'redux/mail/selector';
import MailDrawer from './MailDrawer.styles';
import MailBox from './Mail.styles';

const {
  filterAction,
  selectMail,
  changeComposeMail,
  changeReplyMail,
  changeSearchString,
} = mailActions;

export default function MobileView(props) {
  const [open, setOpen] = React.useState(false);
  const [listVisible, setListVisibility] = React.useState(true);
  const mail = useSelector(state => state.Mails);
  const {
    allMails,
    selectedMail,
    filterAttr,
    composeMail,
    replyMail,
    searchString,
  } = mail;
  const [search, setSearch] = React.useState(searchString);
  const filterMails = mailSelector(mail);

  function openDrawer() {
    setOpen(true);
  }
  function closeDrawer() {
    setOpen(false);
  }

  function toggleListVisible() {
    setListVisibility(listVisible => !listVisible);
  }

  let singleMailComponent = (
    <p className="isoNoMailMsg">
      <IntlMessages id="email.noMessage" />
    </p>
  );
  const index = allMails.findIndex(mail => mail.id === selectedMail);
  if (index !== -1) {
    singleMailComponent = singleMail(
      allMails,
      filterMails,
      index,
      replyMail,
      changeReplyMail,
      selectMail,
      toggleListVisible
    );
  }
  return (
    <div style={{ height: '100%' }}>
      <MailBox className="pixeladminMailBox">
        {listVisible ? (
          composeMail ? (
            <div className="isoSingleMailWrapper">
              <Scrollbars style={{ height: props.height - 70 }}>
                {composeMail ? (
                  <ComposeMail
                    allMails={allMails}
                    mobileView="true"
                    changeComposeMail={changeComposeMail}
                  />
                ) : (
                  singleMailComponent
                )}
              </Scrollbars>
            </div>
          ) : (
            <div className="isoMiddleWrapper">
              <div className="isoBucketLabel">
                <button className="isoBackCatBtn" onClick={openDrawer}>
                  <i className="ion-android-menu" />
                </button>
                <h3>{filterAttr.bucket}</h3>
                <PaginationControl />
              </div>
              <div className="isoSearchMailWrapper">
                <InputSearch
                  placeholder="Search Email"
                  value={search}
                  className="isoSearchEmail"
                  onChange={event => setSearch(event.target.value)}
                  onSearch={value => changeSearchString(value)}
                />
              </div>
              <Scrollbars style={{ height: props.height - 70 }}>
                {mailList(filterMails, selectMail, null, toggleListVisible)}
              </Scrollbars>
            </div>
          )
        ) : (
          <div className="isoSingleMailWrapper">
            <Scrollbars style={{ height: props.height - 70 }}>
              {composeMail ? (
                <ComposeMail allMails={allMails} />
              ) : (
                singleMailComponent
              )}
            </Scrollbars>
          </div>
        )}
      </MailBox>
      <MailDrawer>
        <ReactDrawer open={open} right={true} onChange={closeDrawer}>
          <i onClick={closeDrawer} className="icono-cross" />
          <div className="isoLeftWrapper">
            <ComposeBtn
              changeComposeMail={changeComposeMail}
              onDrawerClose={closeDrawer}
            />
            <div className="isoMailOptions">
              <Scrollbars style={{ height: props.height - 70 }}>
                {mailBuckets(allMails, filterAction, filterAttr, closeDrawer)}
                {mailTags(allMails, filterAction, filterAttr, closeDrawer)}
              </Scrollbars>
            </div>
          </div>
        </ReactDrawer>
      </MailDrawer>
    </div>
  );
}
