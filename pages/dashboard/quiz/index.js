import React from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import { Row, Col, Card, Button, Spin, message, Progress } from "antd";

import LayoutContentWrapper from "components/utility/layoutWrapper";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import PageHeader from "components/utility/pageHeader";

import basicStyle from "assets/styles/constants";
import { useUser } from 'utils/hooks';

import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";

const { rowStyle, colStyle, gutter } = basicStyle;

const CompetencyQuiz = ({ quizList }) => {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const quizListSlugs = quizList.data
  const userCompetencies = user && user.competencies
  let alreadyStartedCompetencyQuizSlugs = []
  const checkForStartedQuiz = alreadyStartedCompetencyQuizSlugs.filter(element => quizListSlugs.includes(element));
  userCompetencies && userCompetencies.map(competency => {
    alreadyStartedCompetencyQuizSlugs.push(competency)
  })

  const onStartQuiz = async (quiz, quizStatus) => {
    if (quizStatus === 'start') {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz: {
            title: quiz.title,
            description: quiz.description,
            slug: quiz.slug,
            competencyScore: 0
          },
          moderationType: 'selectQuiz'
        }),
      });
      if (res.status === 200) {
        success()
        router.replace(`/dashboard/quiz/${quiz.slug}`)
      } else {
        error()
      }
    }
    if (quizStatus === 'continue') {
      router.replace(`/dashboard/quiz/${quiz.slug}`)
      message.info('Good Luck!');
    }
  }

  const success = () => {
    message.success('Test succesfully started. Good Luck!');
  };

  const error = () => {
    message.error('Ooops! Something went wrong!');
  };

  const renderButton = (quiz, index) => {
    const currentQuiz = alreadyStartedCompetencyQuizSlugs.filter(item => item.slug === quiz.slug)
    if (currentQuiz.length) {
      return (
        <>
          <Progress
            percent={currentQuiz[index].competencyScore}
            status=""
            style={{height: '30px'}}
          />
          <Button type="primary" onClick={() => onStartQuiz(quiz, 'continue')}>
            Continue Quiz
          </Button>
        </>
      )
    }
    return (
      <>
        <Progress
          percent={currentQuiz[index].competencyScore}
          status=""
          style={{height: '30px'}}
        />
        <Button type="primary" onClick={() => onStartQuiz(quiz, 'start')}>
          Start Competency Quiz
        </Button>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Competecy Quizzes</title>
      </Head>
      <DashboardLayout>
        <LayoutContentWrapper>
          <PageHeader>Competecy Quizzes</PageHeader>

          <Row style={rowStyle} gutter={gutter} justify="start">
            {quizList ? (
              quizList.data.map((quiz, index) => (
                <Col md={8} sm={24} xs={24} style={colStyle} key={index}>
                  <Card
                    bordered={false}
                    title={quiz.title}
                  >
                    <p>{quiz.description}</p>
                    {
                      renderButton(quiz, index)
                    }
                      
                  </Card>
                </Col>
              ))
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
          </Row>
        </LayoutContentWrapper>
      </DashboardLayout>
    </>
  );
};

CompetencyQuiz.getInitialProps = async () => {
  const url = buildUrl("/api/quiz-variants/all");
  const res = await fetch(url);
  const quizList = await res.json();
  return { quizList };
};

export default CompetencyQuiz;
