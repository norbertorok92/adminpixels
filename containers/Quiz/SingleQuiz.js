import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import ContentHolder from 'components/utility/contentHolder';
import Box from 'components/utility/box';
import LayoutWrapper from 'components/utility/layoutWrapper.js';
import IntlMessages from 'components/utility/intlMessages';
import basicStyle from 'assets/styles/constants';
import actions from 'redux/quiz/actions';
import Question from './Question';
import GettingStartedQuiz from './GettingStartedQuiz';

// const { getQuizData } = actions;

function SingleQuiz(props) {
  useEffect(() => {
    props.getQuestionData();
  }, []);
  const { rowStyle, colStyle, gutter } = basicStyle;
  const {
    questions,
    activeQuestion,
    total,
    submitted,
    answers,
    correct,
    wrong,
    gettingStarted,
  } = props.quiz;

  return (
    <LayoutWrapper>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
          {questions.data ? (
            gettingStarted ? (
              <Box
                title={
                  <IntlMessages id={questions.data[activeQuestion].question} />
                }
              >
                <ContentHolder>
                  <Question
                    question={questions.data[activeQuestion]}
                    setQuestionAnswer={props.setQuestionAnswer}
                    nextQuestion={props.nextQuestion}
                    correct={correct}
                    wrong={wrong}
                    answers={answers}
                    total={total}
                    activeQuestion={activeQuestion}
                    submitted={submitted}
                  />
                </ContentHolder>
              </Box>
            ) : (
              <GettingStartedQuiz gettingStarted={gettingStarted} />
            )
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
)(SingleQuiz);
