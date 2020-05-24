import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Modal,
  message,
  Form,
  Input,
  Button,
  Divider,
  Card,
  Select,
  Alert,
  Collapse,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { stringToSlug } from "utils/utils";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const { Panel } = Collapse;

const addNewQuizModal = ({ visible, handleCancel }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    data: [],
  });

  const [answerOptionsState, setAnswerOptionsState] = useState({
    options: [],
    disabled: false,
    valid: null,
    answers: [],
    saved: false,
  });

  const handleOk = async (form) => {
    form
      .validateFields()
      .then((values) => {
        onCreateQuiz();
        form.resetFields();
      })
      .catch((info) => {
        console.warn("Validate Failed:", info);
      });
  };

  const onCreateQuiz = async () => {
    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });
    if (res.status === 201) {
      message.success("Quiz(s) succesfully created!");
      onReload();
    } else {
      message.error("Ooops! Something went wrong!");
    }
    handleCancel();
  };

  const onReload = () => {
    router.push('/dashboard/quiz');
  };

  const onValidateQuiz = (index) => {
    form
      .validateFields()
      .then((values) => {
        const validAnswerOptions = [];
        const selectedQuiz = values.quiz[index];
        Object.entries(selectedQuiz).map((options, index) => {
          if (options[0].includes("option") && !!options[1]) {
            validAnswerOptions.push(
              <Select.Option key={options[1] + index}>
                {options[1]}
              </Select.Option>
            );
          }
        });
        setAnswerOptionsState({
          options: validAnswerOptions,
          disabled: true,
          valid: true,
        });
      })
      .catch((info) => {
        console.warn("Validate Failed:", info);
      });
  };

  const onSaveQuizQuestion = (index) => {
    const formValues = form.getFieldsValue();
    const selectedQuiz = formValues.quiz[index];
    const quizType = Array.isArray(answerOptionsState.answers)
      ? "multiple"
      : "single";
    const answerOptions = [];
    const data = formState.data;
    Object.entries(selectedQuiz).map((options) => {
      if (options[0].includes("option") && !!options[1]) {
        answerOptions.push({
          value: options[1],
          label: options[1],
        });
      }
    });

    data.push({
      question: selectedQuiz.question,
      slug: stringToSlug(selectedQuiz.question),
      type: quizType,
      options: answerOptions,
      answers: answerOptionsState.answers,
    });

    setAnswerOptionsState((prev) => ({
      ...prev,
      saved: true,
    }));

    setFormState((prev) => ({
      ...prev,
      data: data,
      title: formValues.title,
      description: formValues.description
    }));
  };

  const onSelectCorrectAnswers = (value) => {
    const selectedAnswers = value.length === 1 ? value[0] : value;
    setAnswerOptionsState((prev) => ({
      ...prev,
      answers: selectedAnswers,
    }));
  };

  const onOpenCollapse = () => {
    setAnswerOptionsState((prev) => ({
      ...prev,
      options: [],
      disabled: false,
      valid: null,
      answers: [],
      saved: false,
    }));
  };

  return (
    <Modal
      title="Add New Competency Quiz"
      visible={visible}
      onOk={() => handleOk(form)}
      okText="Add New Quiz"
      onCancel={handleCancel}
      bodyStyle={{ maxHeight: "70vh", overflow: "scroll" }}
      width="65vw"
    >
      <Form
        {...formItemLayoutWithOutLabel}
        name="competency_quiz"
        form={form}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Please add a quiz title!",
            },
          ]}
        >
          <Input placeholder="Quiz title" />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please add a quiz description!",
            },
          ]}
        >
          <Input placeholder="Quiz description" />
        </Form.Item>

        <Form.List name="quiz">
          {(fields, { add, remove }) => {
            return (
              <>
                <Collapse onChange={onOpenCollapse} accordion>
                  {fields.map((field, index) => (
                    <Panel
                      header={`Question nr. ${index + 1}`}
                      key={index}
                      extra={
                        fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: "0 8px", display: "inline-flex" }}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        ) : null
                      }
                      style={{ marginBottom: "10px" }}
                      disabled={fields.length - 1 !== index}
                    >
                      <Form.Item
                        name={[index, "question"]}
                        rules={[
                          {
                            required: true,
                            message: "Please add a quiz question!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Question"
                          disabled={answerOptionsState.disabled}
                        />
                      </Form.Item>

                      <Divider orientation="left" plain>
                        Answer Options for Question nr. {index + 1}
                      </Divider>
                      <Card className="add-quiz-modal">
                        <Form.Item
                          name={[index, "option_1"]}
                          rules={[
                            {
                              required: true,
                              message:
                                "Please add at least TWO answer options!",
                            },
                          ]}
                          style={{
                            width: "100%",
                            marginBottom: "5px",
                          }}
                        >
                          <Input
                            placeholder="Answer Option 1(required)"
                            size="small"
                            disabled={answerOptionsState.disabled}
                          />
                        </Form.Item>
                        <Form.Item
                          name={[index, "option_2"]}
                          rules={[
                            {
                              required: true,
                              message:
                                "Please add at least TWO answer options!",
                            },
                          ]}
                          style={{
                            width: "100%",
                            marginBottom: "5px",
                          }}
                        >
                          <Input
                            placeholder="Answer Option 2(required)"
                            size="small"
                            disabled={answerOptionsState.disabled}
                          />
                        </Form.Item>
                        <Form.Item
                          name={[index, "option_3"]}
                          style={{
                            width: "100%",
                            marginBottom: "5px",
                          }}
                        >
                          <Input
                            placeholder="Answer Option 3(optional)"
                            size="small"
                            disabled={answerOptionsState.disabled}
                          />
                        </Form.Item>
                        <Form.Item
                          name={[index, "option_4"]}
                          style={{
                            width: "100%",
                            marginBottom: "5px",
                          }}
                        >
                          <Input
                            placeholder="Answer Option 4(optional)"
                            size="small"
                            disabled={answerOptionsState.disabled}
                          />
                        </Form.Item>
                        <Form.Item
                          name={[index, "option_5"]}
                          style={{
                            width: "100%",
                            marginBottom: "5px",
                          }}
                        >
                          <Input
                            placeholder="Answer Option 5(optional)"
                            size="small"
                            disabled={answerOptionsState.disabled}
                          />
                        </Form.Item>
                      </Card>
                      {!answerOptionsState.valid && (
                        <Form.Item style={{ marginTop: "15px" }}>
                          <Button
                            type="primary"
                            onClick={() => onValidateQuiz(index)}
                            style={{ width: "100%" }}
                          >
                            Validate Quiz
                          </Button>
                        </Form.Item>
                      )}

                      {answerOptionsState.options.length > 0 &&
                        answerOptionsState.valid && (
                          <>
                            <Form.Item style={{ marginTop: "15px" }}>
                              <Alert
                                message={`Quiz Question nr.${
                                  index + 1
                                } is valid! Select correct answers then save it!`}
                                type="success"
                              />
                            </Form.Item>
                            <Form.Item>
                              <Select
                                mode="multiple"
                                style={{ width: "100%" }}
                                placeholder="Please select the correct answer(s)"
                                onChange={onSelectCorrectAnswers}
                              >
                                {answerOptionsState.options}
                              </Select>
                            </Form.Item>
                            <Form.Item style={{ marginTop: "15px" }}>
                              <Button
                                type="primary"
                                onClick={() => onSaveQuizQuestion(index)}
                                style={{
                                  width: "100%",
                                }}
                              >
                                Save Quiz Question
                              </Button>
                            </Form.Item>
                          </>
                        )}
                    </Panel>
                  ))}
                </Collapse>
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "100%", marginTop: "20px" }}
                    disabled={fields.length > 0 && !answerOptionsState.saved}
                  >
                    <PlusOutlined /> Add Question
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default addNewQuizModal;
