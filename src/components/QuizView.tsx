import { useContext, useEffect, useRef, useState } from "react";
import FeedbackMsg from "./FeedbackMsg";
import IconBtn from "./IconBtn";
import FeedbackBtn from "./FeedbackBtn";
import Modal from "./Modal";
import { toFaNums } from "../utils/toFaNums";
import { feedbackBtnData, feedbackMsgData } from "../data/feedbackData";
import { questionsData, requestedQuestionsIDs, serverSavedFeedback } from "../data/questionsData";
import { useFeedbackBtns } from "../hooks/useFeedbackBtns";
import { QuizContext } from "./Quiz";

const QuizView = () => {
  const { setQuizStatus } = useContext(QuizContext);

  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isAnswerVisible, setAnswerVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const quesrionIDs = useRef(requestedQuestionsIDs);
  let currentQuestionID = quesrionIDs.current[currentQuestionIndex];

  const feedbacks = useRef(serverSavedFeedback);

  const lastQuestionIndex = questionsData.length - 1;
  const progressBarLength = ((currentQuestionIndex + 1) / (lastQuestionIndex + 1)) * 100;

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

  function toggleAnswer() {
    setAnswerVisible((prev) => !prev);
  }

  function hideAnswer() {
    setAnswerVisible(false);
  }

  useEffect(() => {
    hideAnswer();
  }, [currentQuestionIndex]);

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

  function endQuiz() {
    closeEndConfirm();
    openResults();
  }

  function showFilterView() {
    setQuizStatus("off");
  }

  // fetch and inject data
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
  } = questionsData[currentQuestionIndex];

  const {
    btnsMeta,
    msgsMeta,
    updateFeedback,
    resetBtns,
    getBtnsState,
    updateBtnsByObject,
    turnOffAllMsgs,
  } = useFeedbackBtns(feedbackBtnData, feedbackMsgData);

  useEffect(() => {
    turnOffAllMsgs();
  }, [currentQuestionIndex]);

  function saveFeedback(questionId: number, feedbacksMap: Record<string, boolean>) {
    feedbacks.current = feedbacks.current.filter((item) => item.questionId !== questionId);
    feedbacks.current.push({
      questionId,
      userId: "123",
      feedbacks: feedbacksMap,
    });
  }

  useEffect(() => {
    // inja javab ro toye ref esh save mikonim
    console.log(getBtnsState());
    saveFeedback(currentQuestionID, getBtnsState());
  }, [btnsMeta]);

  useEffect(() => {
    currentQuestionID = quesrionIDs.current[currentQuestionIndex];
    const currentFeedback = feedbacks.current.find((item) => item.questionId === currentQuestionID);
    if (!currentFeedback) return;

    const timerId = setTimeout(() => {
      resetBtns();
      updateBtnsByObject(currentFeedback.feedbacks);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentQuestionIndex]);

  return (
    <>
      <div className={`quiz-box ${isAnswerVisible ? "open" : null}`}>
        {/* confirm modal */}
        {showEndConfirm && (
          <Modal onClose={closeEndConfirm} className="w-[310px]">
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
        {showResults && (
          <Modal onClose={closeResults} className="w-[310px]">
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
                  onClick={() => updateFeedback(item.id)}
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
