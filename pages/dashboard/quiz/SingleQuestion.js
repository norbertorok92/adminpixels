import React, { useState } from "react";
import { Radio, Button, message } from "antd";
import { useUser } from 'utils/hooks';

const SingleQuestion = ({ quizItem, total, activeQuestion, quizSlug, isAnswerCorrect, selectedAnswers }) => {
  const [user, { mutate }] = useUser();
  const [state, setState] = useState({
    selectedAnswer: ""
  });

  const onSubmit = async () => {
    const res = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionSlug: quizItem.slug,
        competencySlug: quizSlug,
        selectedAnswer: state.selectedAnswer,
        moderationType: 'selectQuizAnswer',
        isAnswerCorrect: await isAnswerCorrect(quizItem, state.selectedAnswer)
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
      isAnswerCorrect(quizItem, state.selectedAnswer)
    } else {
      error()
    }
  };

  const error = () => {
    message.error('Ooops! Something went wrong!');
  };

  const onRadioChange = (e) => {
    setState({ selectedAnswer: e.target.value });
  };

  const radioStyle = {
    display: 'block',
    height: '50px'
  };

  return (
    <div>
      <Radio.Group onChange={onRadioChange} style={radioStyle} value={state.selectedAnswers || selectedAnswers}>
        {quizItem.options.map(option => {
          return (
            <Radio value={option.value} key={option.label}>
              {option.label}
            </Radio>
          )
        })
      }
      </Radio.Group>
      <Button type="primary" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default SingleQuestion;
