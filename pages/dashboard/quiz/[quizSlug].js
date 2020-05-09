import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Spin, Row, Col, Card, Option, Collapse, Progress, message } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { useUser } from 'utils/hooks';

import LayoutContentWrapper from "components/utility/layoutWrapper";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import PageHeader from "components/utility/pageHeader";
import SingleQuestion from "./SingleQuestion";
import MultipleQuestion from "./MultipleQuestion";

import basicStyle from "assets/styles/constants";
import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";

const { Panel } = Collapse;
const { rowStyle, colStyle, gutter } = basicStyle;

const Quiz = ({ selectedQuiz }) => {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [state, setState] = useState({
    isAnswerCorrect: ""
  });
  const { quizSlug } = router.query;
  const selectedQuizData = selectedQuiz && selectedQuiz.data;
  const totalQuestions = selectedQuizData.data.length;
  const answersData = user && user.answersData && user.answersData || [];
  const correctAnswers = answersData && answersData.filter(item => item.isAnswerCorrect === true)

  const reEvalScore = async (newScore) => {
    const res = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quiz: {
          slug: quizSlug,
          competencyScore: newScore,
        },
        moderationType: 'selectQuiz'
      }),
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
    } else {
      message.error('Ooops! Something went wrong!');
    }
  }

  const evalAnswer = (quizItem, selectedAnswer) => {
    if (quizItem.type === "single") {
      genExtra(quizItem.answers === selectedAnswer)
      return quizItem.answers === selectedAnswer
    } 
    if (quizItem.type === "multiple") {
      const checker = (array, target) => target.every(item => array.includes(item));
      genExtra(selectedAnswer && checker( quizItem.answers, selectedAnswer))
      return selectedAnswer && checker( quizItem.answers, selectedAnswer)
    } 
  }

  const genExtra = (isCorrect) => {
    switch(isCorrect){
      case true:
        return <CheckCircleTwoTone twoToneColor="#4eb57f" style={{ fontSize: '20px' }} />
      case false:
        return <CloseCircleTwoTone twoToneColor="#f83e46" style={{ fontSize: '20px' }} />
      default:
        return ""
    }
  };

  const renderQuestion = (quizItem, index) => {
    const currentItem = answersData && answersData.find(item => item.questionSlug === quizItem.slug) || []
    return (
      <Panel header={quizItem.question} key={index} extra={genExtra(currentItem && currentItem.isAnswerCorrect)}>
        {quizItem.type === "single" ? (
          <SingleQuestion
            quizItem={quizItem}
            total={totalQuestions}
            activeQuestion={index + 1}
            quizSlug={quizSlug}
            selectedAnswers={currentItem && currentItem.selectedAnswer}
            isAnswerCorrect={evalAnswer}
          />
        ) : (
          <MultipleQuestion
            quizItem={quizItem}
            total={totalQuestions}
            activeQuestion={index + 1}
            quizSlug={quizSlug}
            selectedAnswers={currentItem && currentItem.selectedAnswer}
            isAnswerCorrect={evalAnswer}
          />
        )}
      </Panel>
    );
  };

  const calculatePercentage = (hundredPercent, correctPercent) => {
    const newScore =  100 * correctPercent / hundredPercent
    reEvalScore(newScore)
    return newScore
  }

  return (
    <>
      <Head>
        <title>QUIZ</title>
      </Head>
      <DashboardLayout>
        <LayoutContentWrapper>
          <PageHeader>Quiz</PageHeader>
          {selectedQuizData && user ? (
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col span={24} style={colStyle}>
                <Card bordered={false} title={selectedQuizData.title}>
                  <Progress
                    percent={calculatePercentage(totalQuestions, correctAnswers && correctAnswers.length)}
                    status=""
                    style={{height: '30px'}}
                  />
                  <Collapse
                    defaultActiveKey={["0"]}
                    onChange={() => {}}
                    expandIconPosition={"left"}
                  >
                    {selectedQuizData.data.map((quizItem, index) => {
                      {
                        return renderQuestion(quizItem, index);
                      }
                    })}
                  </Collapse>
                </Card>
              </Col>
            </Row>
          ) : (
            <div
              style={{
                minHeight: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin />
            </div>
          )}
        </LayoutContentWrapper>
      </DashboardLayout>
    </>
  );
};

Quiz.getInitialProps = async ({ query }) => {
  const { quizSlug } = query;
  const url = buildUrl(`/api/quiz/${quizSlug}`);
  const res = await fetch(url);
  const selectedQuiz = await res.json();
  return { selectedQuiz };
};

export default Quiz;
