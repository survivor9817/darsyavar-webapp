import { useContext, useEffect, useRef, useState } from "react";
import { toFaNums } from "../utils/toFaNums";
import { feedbackBtnData, feedbackMsgData } from "../data/feedbackData";
import { questionsData, requestedQuestionsIDs, serverSavedFeedback } from "../data/questionsData";
import { useFeedbackBtns, type FeedbackBtnsStateType } from "../hooks/useFeedbackBtns";
import { QuizContext } from "./Quiz";
import FeedbackMsg from "./FeedbackMsg";
import IconBtn from "./IconBtn";
import FeedbackBtn from "./FeedbackBtn";
import Modal from "./Modal";
import QuestionTag from "./QuestionTag";
import { useUpdateEffect } from "../hooks/useUpdateEffect";

const QuizView = () => {
  const { setQuizStatus } = useContext(QuizContext);

  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isAnswerVisible, setAnswerVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // aval fetch idhaa

  // fetch and inject data
  const questionData = questionsData[currentQuestionIndex];
  if (!questionData) return null;
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
  } = questionData;

  // fetch by users filters and save qids array in a ref.
  const questionIDs = useRef(requestedQuestionsIDs);

  const [progressPercent, setProgressPercent] = useState(0);
  const lastQuestionIndex = questionIDs.current.length - 1;
  useEffect(() => {
    const progressBarLength = ((currentQuestionIndex + 1) / (lastQuestionIndex + 1)) * 100;
    requestAnimationFrame(() => {
      setProgressPercent(progressBarLength);
    });
  }, [currentQuestionIndex]);

  function toggleAnswer() {
    setAnswerVisible((prev) => !prev);
  }

  function hideAnswer() {
    setAnswerVisible(false);
  }

  function closeEndConfirm() {
    setShowEndConfirm(false);
  }

  function openEndConfirm() {
    setShowEndConfirm(true);
  }

  function closeResults() {
    setShowResults(false);
  }

  function openResults() {
    setShowResults(true);
  }

  function endQuiz() {
    closeEndConfirm();
    openResults();
  }

  function showFilterView() {
    setQuizStatus("off");
  }

  function goToQuestion(number: number) {
    if (number < 0 || isNaN(number) || number > lastQuestionIndex) return;
    setCurrentQuestionIndex(number);
  }

  function goToPrevQuestion() {
    const newQuestionIndex = Math.max(0, currentQuestionIndex - 1);
    goToQuestion(newQuestionIndex);
  }

  function goToNextQuestion() {
    if (currentQuestionIndex === lastQuestionIndex) {
      setShowEndConfirm(true);
      return;
    }
    const newQuestionIndex = Math.min(lastQuestionIndex, currentQuestionIndex + 1);
    goToQuestion(newQuestionIndex);
  }

  // feedback handlers
  const {
    btnsMeta,
    msgsMeta,
    updateFeedbackOnClick,
    resetBtns,
    getBtnsState,
    setBtnsStateByObject,
    turnOffAllMsgs,
  } = useFeedbackBtns(feedbackBtnData, feedbackMsgData);

  useEffect(() => {
    hideAnswer();
    turnOffAllMsgs();
  }, [currentQuestionIndex]);

  // move to custom hook
  // fetch feedbacks
  const feedbacks = useRef(serverSavedFeedback);
  const currentQuestionID = questionIDs.current[currentQuestionIndex];

  function getFeedbackFromDB(questionId: number, userId: string) {
    const currentFeedback = feedbacks.current.find(
      (f) => f.questionId === questionId && f.userId === userId
    );

    if (!currentFeedback) {
      return {
        isCorrect: false,
        isIncorrect: false,
        isLike: false,
        isStar: false,
        isReport: false,
      };
    }

    const { answer, isLike, isStar, isReport } = currentFeedback;

    const newBtnsState: FeedbackBtnsStateType = {
      isCorrect: answer === true,
      isIncorrect: answer === false,
      isLike: isLike || false,
      isStar: isStar || false,
      isReport: isReport || false,
    };

    return newBtnsState;
  }

  // load feedback on load question and on change question.
  useEffect(() => {
    const currentFeedbackObj = getFeedbackFromDB(currentQuestionID, "123");
    const timerId = setTimeout(() => {
      resetBtns();
      setBtnsStateByObject(currentFeedbackObj);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentQuestionIndex]);

  // save feedback on data base.
  function saveFeedbackToDB(questionId: number, userId: string, btnsState: FeedbackBtnsStateType) {
    const { isCorrect, isIncorrect, isLike, isStar, isReport } = btnsState;

    let answer = null;
    if (isCorrect) answer = true;
    if (isIncorrect) answer = false;

    const dbFeedbackObj = { questionId, userId, answer, isLike, isStar, isReport };

    feedbacks.current = feedbacks.current.filter(
      (item) => item.questionId !== questionId && item.userId === userId
    );

    feedbacks.current.push(dbFeedbackObj);
  }

  useUpdateEffect(() => {
    saveFeedbackToDB(currentQuestionID, "123", getBtnsState());
  }, [btnsMeta]);

  return (
    <>
      <div className={`quiz-box ${isAnswerVisible ? "open" : null}`}>
        {/* confirm modal */}
        {showEndConfirm && (
          <Modal onClose={closeEndConfirm} className="w-77.5">
            {/* Message */}
            <p className="text-center text-lg leading-6 mt-6 mb-6 p-4">
              می‌خوای این جلسه تمرین رو تموم کنی؟
            </p>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4">
              <button
                className="rounded-full bg-black text-white px-6 py-2 transition-colors hover:bg-neutral-700 active:bg-neutral-800 w-lg h-10 cursor-pointer"
                onClick={endQuiz}
              >
                بله
              </button>

              <button
                className="rounded-full bg-gray-200 text-black px-6 py-2 transition-colors hover:bg-gray-300 active:bg-gray-400 w-lg h-10 cursor-pointer"
                onClick={closeEndConfirm}
              >
                خیر
              </button>
            </div>
          </Modal>
        )}

        {/* results modal */}
        {/* inja bayad ye component modal bashe ke data result tamrin ro
        begire onaa ro tooye ye jadval render kone */}
        {showResults && (
          <Modal onClose={closeResults} className="w-77.5">
            {/* Message */}
            <p className="text-center text-lg leading-6 mt-6 mb-6 p-4">ماشالا پسر عالی ریدی</p>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4">
              <button
                className="rounded-full bg-black text-white px-6 py-2 transition-colors hover:bg-neutral-700 active:bg-neutral-800 w-lg h-10 cursor-pointer"
                onClick={showFilterView}
              >
                بله
              </button>

              <button
                className="rounded-full bg-gray-200 text-black px-6 py-2 transition-colors hover:bg-gray-300 active:bg-gray-400 w-lg h-10 cursor-pointer"
                onClick={closeResults}
              >
                خیر
              </button>
            </div>
          </Modal>
        )}

        {/* Quiz card */}
        {/* <!-- Row 1 : Navigation Buttons of Exercise Section --> */}
        <div className="quiz-navbar">
          <div className="quiz-nav-right">
            <IconBtn
              className={"btn--prev-question"}
              icon={"arrow_circle_right"}
              onClick={goToPrevQuestion}
            />
          </div>

          <div className="quiz-nav-left">
            <IconBtn
              className={"btn--prev-question"}
              icon={"power_settings_circle"}
              onClick={openEndConfirm}
            />

            <IconBtn
              className={"btn--next-question"}
              icon={"arrow_circle_left"}
              onClick={goToNextQuestion}
            />
          </div>
        </div>

        {/* <!-- Row 2 : Exercise Number and Tags --> */}
        <div className="top-info-bar">
          <div className="exercise-number">
            {/* {"شماره تمرین"} */}
            {`تمرین شماره ${toFaNums(currentQuestionIndex + 1)} از ${toFaNums(
              lastQuestionIndex + 1
            )}`}
          </div>
          <div className="tags-container">
            {/* {"تگ ها"} */}
            <ul className="tags-list">
              {tags.map((tag) => (
                <QuestionTag tagLabel={tag} />
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
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* <!-- Row 4 : Question Box --> */}
        <div className="question-card">
          <div className="question-content" dangerouslySetInnerHTML={{ __html: question }}>
            {/* {"متن سوال"} */}
          </div>

          {/* <!-- user feedbacks --> */}
          <div className="feedback-msg-box">
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
        <div className="question-mid-bar">
          <div className="toggle-author-container">
            <button className="btn--show-answer" onClick={toggleAnswer}></button>

            <div className="question-author">
              <i className="msr"> draft_orders </i>
              <span className="author-fullname">
                {/* {"نویسنده"} */}
                {author}
              </span>
            </div>
          </div>

          <div className="question-details-box">
            <div className="question-details">
              {/* {"نمره تاریخ منبع"} */}
              {`${source} - ${date} - ${toFaNums(score)} نمره`}
            </div>

            <div className="question-feedback-btns">
              {btnsMeta.map((item) => (
                <FeedbackBtn
                  key={item.id}
                  icon={item.icon}
                  className={item.className}
                  isOn={item.isOn}
                  onClick={() => updateFeedbackOnClick(item.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* <!-- Row 6 : Answer Box --> */}
        <div className="question-answer-card">
          <div className="answer-content" dangerouslySetInnerHTML={{ __html: descriptiveAnswer }}>
            {/* {"متن جواب"} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizView;
