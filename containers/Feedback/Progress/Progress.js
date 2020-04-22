import React from 'react';
import { Row, Col } from 'antd';
import Button, { ButtonGroup } from 'components/uielements/button';
import Progress from 'components/uielements/progress';
import PageHeader from 'components/utility/pageHeader';
import LayoutWrapper from 'components/utility/layoutWrapper.js';
import Box from 'components/utility/box';
import basicStyle from 'assets/styles/constants';

export default function() {
  const [percent, setPercent] = React.useState(0);

  const increase = () => {
    let newPercent = percent + 10;
    if (newPercent > 100) {
      newPercent = 100;
    }
    setPercent(newPercent);
  };
  const decline = () => {
    let newPercent = percent - 10;
    if (newPercent < 0) {
      newPercent = 0;
    }
    setPercent(newPercent);
  };
  const { rowStyle, colStyle, gutter } = basicStyle;
  return (
    <LayoutWrapper>
      <PageHeader>Progress Bar</PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={12} style={colStyle}>
          <Box title="Progress bar" subtitle="A standard progress bar.">
            <Progress percent={30} />
            <Progress percent={50} status="active" />
            <Progress percent={70} status="exception" />
            <Progress percent={100} />
            <Progress percent={50} showInfo={false} />
          </Box>
        </Col>
        <Col span={12} style={colStyle}>
          <Box
            title="Circular Progress bar"
            subtitle="A circular progress bar."
          >
            <Progress type="circle" percent={75} />
            <Progress type="circle" percent={70} status="exception" />
            <Progress type="circle" percent={100} />
          </Box>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={8} style={colStyle}>
          <Box
            title="Mini size progress bar"
            subtitle="Appropriate for a narrow area."
          >
            <Progress percent={30} strokeWidth={5} />
            <Progress percent={50} strokeWidth={5} status="active" />
            <Progress percent={70} strokeWidth={5} status="exception" />
            <Progress percent={100} strokeWidth={5} />
          </Box>
        </Col>
        <Col span={8} style={colStyle}>
          <Box
            title="Mini size circular progress bar"
            subtitle="A smaller circular progress bar."
          >
            <Progress type="circle" percent={30} width={80} />
            <Progress
              type="circle"
              percent={70}
              width={80}
              status="exception"
            />
            <Progress type="circle" percent={100} width={80} />
          </Box>
        </Col>
        <Col span={8} style={colStyle}>
          <Box
            title="Dynamic circular progress bar"
            subtitle="A dynamic progress bar is better."
          >
            <Progress type="circle" percent={percent} />
            <ButtonGroup>
              <Button onClick={decline} icon="minus" />
              <Button onClick={increase} icon="plus" />
            </ButtonGroup>
          </Box>
        </Col>
      </Row>
      <Box
        title="Custom text format"
        subtitle="You can custom text format by setting format."
      >
        <Progress
          type="circle"
          percent={75}
          format={percent => `${percent} Days`}
        />
        <Progress type="circle" percent={100} format={() => 'Done'} />
      </Box>
      <Box title="Dashboard" subtitle="A dashboard style of progress.">
        <Progress type="dashboard" percent={75} />
      </Box>
    </LayoutWrapper>
  );
}
