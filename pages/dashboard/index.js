import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Row, Col, Card, Collapse, Typography, Spin, Space } from "antd";
import PageHeader from "components/utility/pageHeader";
import Box from "components/utility/box";
import LayoutWrapper from "components/utility/layoutWrapper";
import ContentHolder from "components/utility/contentHolder";
import basicStyle from "assets/styles/constants";
import * as configs from "./chartConfig";
import GoogleChart from "react-google-charts";
import { useUser } from "utils/hooks";

import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";

import { mergeCompetencies } from "utils/utils";

import DashboardLayout from "components/DashboardLayout/DashboardLayout";

const { Panel } = Collapse;
const { Text } = Typography;
const { rowStyle, colStyle, gutter } = basicStyle;

const Dashboard = ({ allUsers }) => {
  const [user] = useUser();
  const router = useRouter();
  const googleTreeChartData = [
    [
      "CATEGORY",
      "Parent",
      "Quiz Volume",
      "Quiz Volume increase/decrease (color)",
    ],
    ["CATEGORY", null, 0, 0],
  ];
  const googleBarChartData = [["Competency", "Avg. Comp. Score"]];
  const googleDonutChartData = [["Competency Cat.", "Hours per Day"]];
  const allUsersData = allUsers.data;
  let peopleCompetencies = [];
  allUsersData &&
    allUsersData.map((user) => {
      if (user.competencies && user.competencies.length > 0) {
        peopleCompetencies.push(...user.competencies);
      }
    });

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, []);

  if (!user) {
    return (
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
    );
  }

  const renderTreeMapChart = () => {
    let categories = [];
    let categoriesCount = {};
    let quizzes = [];
    let quizzesCount = {};

    if (peopleCompetencies.length > 0) {
      if (peopleCompetencies.length > 1) {
        peopleCompetencies.map((competency, index) => {
          categories.push(competency.category.toUpperCase());
          quizzes.push(
            `${competency.title.toUpperCase()}_${competency.category.toUpperCase()}`
          );
        });
      }

      categories.map((cat) => {
        return (categoriesCount[cat] = "CATEGORY");
      });

      quizzes.map((quiz) => {
        return (quizzesCount[quiz] = (quizzesCount[quiz] || 0) + 1);
      });

      Object.entries(categoriesCount).map((cat) => {
        return googleTreeChartData.push([cat[0], "CATEGORY", 0, 0]);
      });

      Object.entries(quizzesCount).map((quiz) => {
        const quizArr = quiz[0].split("_");
        quizArr.push(quiz[1], quiz[1]);
        return googleTreeChartData.push(quizArr);
      });

      const googleConfig = {
        ...configs.TreeMap,
        data: googleTreeChartData,
      };

      return <GoogleChart {...googleConfig} />;
    }
  };

  const renderBarChart = () => {
    let quizzes = [];
    let quizScores = [];
    let quizzesCount = {};

    if (peopleCompetencies.length > 0) {
      peopleCompetencies.map((competency, index) => {
        quizzes.push(competency.title.toUpperCase());
        quizScores.push([
          competency.title.toUpperCase(),
          competency.competencyScore,
        ]);
      });

      quizzes.map((quiz) => {
        return (quizzesCount[quiz] = (quizzesCount[quiz] || 0) + 1);
      });

      const quizScoreCount = quizScores.reduce((accumulator, cur) => {
        let competencyTitle = cur[0];
        let found = accumulator.find((elem) => elem[0] === competencyTitle);
        if (found) found[1] += cur[1];
        else accumulator.push(cur);
        return accumulator;
      }, []);

      quizScoreCount.map((quiz) => {
        if (quiz[1] !== 0) {
          let quizCount = quizzesCount[quiz[0]];
          let quizAvg = quiz[1] / quizCount;
          return googleBarChartData.push([quiz[0], quizAvg]);
        }
      });

      const googleConfig = {
        ...configs.BarChart,
        data: googleBarChartData,
      };

      return <GoogleChart {...googleConfig} />;
    }
  };

  const renderDonutChart = () => {
    let categories = [];
    let categoriesCount = {};

    if (peopleCompetencies.length > 0) {
      peopleCompetencies.map((competency, index) => {
        categories.push(competency.category.toUpperCase());
      });

      categories.map((cat) => {
        return (categoriesCount[cat] = (categoriesCount[cat] || 0) + 1);
      });

      Object.entries(categoriesCount).map((cat) => {
        return googleDonutChartData.push(cat);
      });

      const googleConfig = {
        ...configs.DonutChart,
        data: googleDonutChartData,
      };

      return <GoogleChart {...googleConfig} />;
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        {allUsersData && peopleCompetencies.length > 0 ? (
          <LayoutWrapper className="isoMapPage">
            <PageHeader>Dashboard</PageHeader>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={24} xs={24} style={colStyle}>
                <Card title="Company overview">
                  <Collapse
                    defaultActiveKey={["0"]}
                    expandIconPosition={"left"}
                  >
                    <Panel header="Competency Quiz Avg. Scores">
                      <Space direction="vertical">
                        <Text type="secondary">
                          In this chart you can view what is the average score
                          across the company for the competency quizzes
                          available for the members.
                        </Text>
                        <Text mark>
                          Please NOTE: Quizzes started, but still at 0% progress
                          don't appear in this chart
                        </Text>
                      </Space>
                      {renderBarChart()}
                    </Panel>

                    <Panel header="Competency Treemap">
                      <Space direction="vertical">
                        <Text type="secondary">
                          In this chart you can view what competency quizzes the
                          members of your company started. Click on the category
                          to see quizzes separated in categories. This will give
                          you an understanding of the level of interest members
                          tend to have in different quizzes.
                        </Text>
                        <Text mark>
                          Please NOTE: All started quizzes appear in this chart.
                          Even those with 0% progress.
                        </Text>
                      </Space>
                      {renderTreeMapChart()}
                    </Panel>

                    <Panel header="Competency Quiz Categories">
                      <Space direction="vertical">
                        <Text type="secondary">
                          In this chart you can observe the percentage of
                          competency categories that are started by the members
                          of your organization.
                        </Text>
                        <Text mark>
                          Please NOTE: All started quizzes appear in this chart.
                          Even those with 0% progress.
                        </Text>
                      </Space>
                      {renderDonutChart()}
                    </Panel>
                  </Collapse>
                </Card>
              </Col>
            </Row>
          </LayoutWrapper>
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
      </DashboardLayout>
    </>
  );
};

Dashboard.getInitialProps = async () => {
  const url = buildUrl("/api/user/all");
  const res = await fetch(url);
  const allUsers = await res.json();
  return { allUsers };
};

export default Dashboard;
