import { useEffect, useRef, useState } from "react";
import FeedbackMsg from "./FeedbackMsg";
import IconBtn from "./IconBtn";
import FeedbackBtn from "./FeedbackBtn";
import { toFaNums } from "../utils/toFaNums";
import { feedbackBtnData, feedbackMsgData } from "../data/feedbackData";
import { questionsData } from "../data/questionsData";

const QuizView = () => {
  const [isAnswerVisible, setAnswerVisible] = useState(false);

  function toggleAnswer() {
    setAnswerVisible((prev) => !prev);
  }

  function hideAnswer() {
    setAnswerVisible(false);
  }

  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  // fetch bayad bezanim ke in var haye badi moshakhas beshan
  const lastQuestionIndex = questionsData.length - 1;
  const progressBarLength = ((currQuestionIndex + 1) / (lastQuestionIndex + 1)) * 100;

  useEffect(() => {
    hideAnswer();
  }, [currQuestionIndex]);

  function goToQuestion(number: number) {
    if (number < 0 || isNaN(number) || number > lastQuestionIndex) return;
    setCurrQuestionIndex(number);
  }

  function goToPrevQuestion() {
    const newQuestionIndex = Math.max(0, +currQuestionIndex - 1);
    goToQuestion(newQuestionIndex);
  }

  function goToNextQuestion() {
    const newQuestionNumber = Math.min(+lastQuestionIndex, +currQuestionIndex + 1);
    goToQuestion(newQuestionNumber);
  }

  const {
    // id,
    // bookName,
    question,
    // answerKey,
    descriptiveAnswer,
    author,
    source,
    date,
    score,
    tags,
    // refs,
  } = questionsData[currQuestionIndex];

  // btns and msgs handlers and logic #########################################
  const [btnsMeta, setBtnsMeta] = useState(feedbackBtnData);
  const [msgsMeta, setMsgsMeta] = useState(feedbackMsgData);

  function handleBtn(id: string, state: boolean) {
    setBtnsMeta((prev) => {
      return prev.map((item) => {
        if (item.id === id) return { ...item, isOn: state };
        const clickedOnCorrect = id === "correct" && item.id === "incorrect";
        const clickedOnIncorrect = id === "incorrect" && item.id === "correct";
        if (clickedOnCorrect || clickedOnIncorrect) return { ...item, isOn: false };
        return item;
      });
    });
  }

  function handleMsg(id: string, state: boolean) {
    setMsgsMeta((prev) => {
      return prev.map((item) => {
        if (item.id === id) return { ...item, isOn: state };
        const clickedOnCorrect = id === "correct" && item.id === "incorrect";
        const clickedOnIncorrect = id === "incorrect" && item.id === "correct";
        if (clickedOnCorrect || clickedOnIncorrect) return { ...item, isOn: false };
        return item;
      });
    });
  }

  const prevMsgTimeout = useRef<number | null>(null);
  function clearPrevMsgTimeout() {
    if (prevMsgTimeout.current !== null) {
      clearTimeout(prevMsgTimeout.current);
      prevMsgTimeout.current = null;
    }
  }

  useEffect(() => {
    return () => {
      clearPrevMsgTimeout();
    };
  }, []);

  function updateFeedback(id: string) {
    const isClickedBtnOn = btnsMeta.find((item) => item.id === id)?.isOn;
    const isClickedMsgOn = msgsMeta.find((item) => item.id === id)?.isOn;
    const isOtherMsgOn = msgsMeta.some((item) => item.id !== id && item.isOn);
    const otherOnMsgID = isOtherMsgOn && msgsMeta.find((item) => item.isOn)?.id;
    // const noMsgsOn = !msgsMeta.some((item) => item.isOn);

    if (isClickedBtnOn) {
      handleBtn(id, false);
    }

    if (isClickedBtnOn && isClickedMsgOn) {
      handleBtn(id, false);
      clearPrevMsgTimeout();
      handleMsg(id, false);
    }

    if (!isClickedBtnOn && !isOtherMsgOn) {
      handleBtn(id, true);
      handleMsg(id, true);
      prevMsgTimeout.current = setTimeout(() => {
        handleMsg(id, false);
      }, 1500);
    }

    if (!isClickedBtnOn && isOtherMsgOn) {
      handleBtn(id, true);
      if (!otherOnMsgID) return;
      clearPrevMsgTimeout();
      handleMsg(otherOnMsgID, false);
      handleMsg(id, true);
      prevMsgTimeout.current = setTimeout(() => {
        handleMsg(id, false);
      }, 1500);
    }
  }
  // #########################################################################

  // inja feedbacke har soal ro dar har click mitonim hesab konim
  const btnsState = btnsMeta.reduce<Record<string, boolean>>((acc, item) => {
    acc[item.id] = item.isOn;
    return acc;
  }, {});

  // fetch and inject buttons data from server
  useEffect(
    () => {
      const serverSavedFeedback = {
        correct: false,
        incorrect: false,
        like: false,
        star: true,
        report: true,
      };

      Object.entries(serverSavedFeedback).forEach(([id, isOn]) => {
        handleBtn(id, isOn);
      });
    },
    [
      /** question current number
       * bayad code baala toye time out ham bashe
       * bekhaatere moddate transition ui dokme haa
       */
    ]
  );

  console.log("Buttons State:", btnsState);

  return (
    <>
      <div
        id="ExercisesContainer"
        className={`exercises-container ${isAnswerVisible ? "open" : null}`}
      >
        {/* <!-- Row 1 : Navigation Buttons of Exercise Section --> */}
        <div className="exercise-navbar">
          <IconBtn
            className={"btn--prev-question"}
            icon={"arrow_circle_right"}
            onClick={goToPrevQuestion}
          />
          <IconBtn
            className={"btn--next-question"}
            icon={"arrow_circle_left"}
            onClick={goToNextQuestion}
          />
        </div>

        {/* <!-- Row 2 : Exercise Number and Tags --> */}
        <div className="top-info-bar">
          <div className="exercise-number">
            {/* {"شماره تمرین"} */}
            {`تمرین شماره ${toFaNums(currQuestionIndex + 1)} از ${toFaNums(lastQuestionIndex + 1)}`}
          </div>
          <div className="tags-container">
            <ul className="tags-list">
              {/* {"تگ ها"} */}
              {/* {renderedTags} */}
              {tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* <!-- Row 3 : Exercise Number and Tags --> */}
        <div className="progress-wrapper">
          <div className="progress-container">
            <div
              className="progress-bar"
              id="ProgressBar"
              style={{ width: `${progressBarLength}%` }}
            ></div>
          </div>
        </div>

        {/* <!-- Row 4 : Question Box --> */}
        <div className="question-card">
          <div className="question-container" dangerouslySetInnerHTML={{ __html: question }}>
            {/* {"متن سوال"} */}
          </div>

          {/* <!-- user feedbacks --> */}
          <div className="feedback-msg-container">
            <ul className="feedback-msg-list">
              {msgsMeta.map((item) => (
                <FeedbackMsg
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  className={item.className}
                  isOn={item.isOn}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* <!-- Row 5 : Middle Row : answerToggle-authorLink-userInputs --> */}
        <div className="exercise__middle-bar">
          <div className="toggle-author-container">
            <button id="ShowAnswerBtn" className="btn--show-answer" onClick={toggleAnswer}></button>
            <div className="exercise-author">
              <i className="msr"> draft_orders </i>
              <span id="AuthorFullName">
                {/* {"نویسنده"} */}
                {author}
              </span>
            </div>
          </div>
          <div className="details-inputBtns-container">
            <div className="exercise-details">
              {/* {"نمره تاریخ منبع"} */}
              {`${source} - ${date} - ${toFaNums(score)} نمره`}
            </div>
            <div className="quiz-feedback-btns">
              {btnsMeta.map((item) => (
                <FeedbackBtn
                  key={item.id}
                  icon={item.icon}
                  className={item.className}
                  isOn={item.isOn}
                  onClick={() => updateFeedback(item.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* <!-- Row 6 : Answer Box --> */}
        <div className="exercise__answer-box">
          <div
            className="descriptive-answer"
            dangerouslySetInnerHTML={{ __html: descriptiveAnswer }}
          >
            {/* {"متن جواب"} */}
          </div>
          {/* <!-- Row 7 : References --> */}
          {/* <div className="exercise-bottom-bar">
              <ul className="ref-list">{refsList()}</ul>
            </div> */}
        </div>
      </div>
    </>
  );
};

export default QuizView;
