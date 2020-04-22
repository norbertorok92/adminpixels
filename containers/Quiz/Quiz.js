import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import ContentHolder from 'components/utility/contentHolder';
import Box from 'components/utility/box';
import LayoutWrapper from 'components/utility/layoutWrapper.js';
import IntlMessages from 'components/utility/intlMessages';
import basicStyle from 'assets/styles/constants';
import actions from 'redux/quiz/actions';
import Quizes from './Quizes';

// const { getQuizData } = actions;

function Quiz(props) {
  useEffect(() => {
    props.getQuizData();
  }, []);
  const { rowStyle, colStyle, gutter } = basicStyle;
  const { quizes } = props.quiz;
  return (
    <LayoutWrapper>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
          {quizes ? (
            <Box title={<IntlMessages id="WELCOME TO AdminPixels QUIZ" />}>
              <ContentHolder>
                <Quizes quizes={quizes} />
              </ContentHolder>
            </Box>
          ) : null}
        </Col>
      </Row>
    </LayoutWrapper>
  );
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
  };
}
export default connect(
  mapStateToProps,
  { ...actions }
)(Quiz);
