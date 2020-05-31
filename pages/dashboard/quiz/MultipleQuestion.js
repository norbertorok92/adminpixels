import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import { useUser } from 'utils/hooks';

const MultipleQuestion = ({ quizItem, total, activeQuestion, quizSlug, isAnswerCorrect, selectedAnswers }) => {
  const [user, { mutate }] = useUser();
  const [state, setState] = useState({
    selectedAnswers: []
  });

  const onCheckboxChange = (e) => {
    setState({ selectedAnswers: e });
  };

  const onSubmit = async e => {
    const res = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionSlug: quizItem.slug,
        competencySlug: quizSlug,
        selectedAnswer: state.selectedAnswers,
        moderationType: 'selectQuizAnswer',
        isAnswerCorrect: await isAnswerCorrect(quizItem, state.selectedAnswers)
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

  const CheckBoxStyle = {
    display: 'block',
    height: '50px'
  };

  return (
    <div>
      <Checkbox.Group
        onChange={onCheckboxChange}
        options={quizItem.options}
        style={CheckBoxStyle}
        checked
        defaultValue={selectedAnswers || state.selectedAnswers}
      >
        {quizItem.options.map(option => {
          return (
            <Checkbox value={option.label} key={option.label}>
              {option.label}
            </Checkbox>
          )
        })}
      </Checkbox.Group>
      <Button type="primary" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default MultipleQuestion;
