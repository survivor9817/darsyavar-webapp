import { useContext, useEffect, useRef } from "react";
import { useFeedbackBtns } from "../hooks/useFeedbackBtns";
import { useQuizNavigation } from "../hooks/useQuizNavigation";
import { QuizContext } from "./Quiz";
import { feedbackBtnData, feedbackMsgData } from "../data/feedbackData";
import { toFaNums } from "../utils/toFaNums";
import { questionsData, requestedQuestionsIDs, serverSavedFeedback } from "../data/questionsData";
import FeedbackMsg from "./FeedbackMsg";
import IconBtn from "./IconBtn";
import FeedbackBtn from "./FeedbackBtn";
import Modal from "./Modal";
import QuestionTag from "./QuestionTag";
import QuizResultsModalContent from "./QuizResultsModalContent";
import QuizEndConfirm from "./QuizEndConfirm";
import useToggle from "../hooks/useToggle";

const QuizView = () => {
  // ==================================================================
  // useFetchQuestionIDs and feedbacks
  // ==================================================================
  const questionIDs = useRef(requestedQuestionsIDs);
  const feedbacks = useRef(serverSavedFeedback);

  // ==================================================================
  // useQuizNavigations
  // ==================================================================
  const lastQuestionIndex = questionIDs.current.length - 1;

  const [endConfirm, , openEndConfirm, closeEndConfirm] = useToggle();

  const { currentQuestionIndex, progressPercent, goToPrevQuestion, goToNextQuestion } =
    useQuizNavigation(0, lastQuestionIndex, openEndConfirm);

  const [isAnswerVisible, toggleAnswer, , hideAnswer] = useToggle();
  useEffect(() => {
    hideAnswer();
  }, [currentQuestionIndex]);

  const [results, , openResults, closeResults] = useToggle();

  // ==================================================================
  // useFeedbackBtns
  // ==================================================================

  const {
    feedbacks: feedbackss,
    btnsMeta,
    msgsMeta,
    updateFeedbackOnClick,
  } = useFeedbackBtns(
    feedbackBtnData,
    feedbackMsgData,
    currentQuestionIndex,
    "123",
    feedbacks.current,
    questionIDs.current
  );

  const { setQuizStatus } = useContext(QuizContext);
  function showFilterView() {
    setQuizStatus("off");
  }

  function endQuiz() {
    closeEndConfirm();
    openResults();
    console.log(feedbacks);
  }

  // ==================================================================
  // useFetchQuestion
  // ==================================================================
  const questionData = questionsData[currentQuestionIndex];
  if (!questionData) return null;
  const { question, descriptiveAnswer, author, source, date, score, tags } = questionData;

  const progressLabel = `تمرین شماره ${toFaNums(currentQuestionIndex + 1)} از ${toFaNums(
    lastQuestionIndex + 1
  )}`;

  const questionDetails = `${source} - ${date} - ${toFaNums(score)} نمره`;

  return (
    <>
      <div className={`quiz-box ${isAnswerVisible ? "open" : ""}`}>
        {/* confirm modal */}
        {endConfirm && (
          <Modal onClose={closeEndConfirm} className="w-77.5">
            <QuizEndConfirm onAction={endQuiz} onClose={closeEndConfirm} />
          </Modal>
        )}

        {/* results modal */}
        {results && (
          <Modal onClose={closeResults} className="w-77.5">
            <QuizResultsModalContent
              onAction={showFilterView}
              onClose={closeResults}
              feedbacksData={feedbackss.current}
              totalQuestionsNumber={questionIDs.current.length}
            />
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
              iconClassName={"text-red-700"}
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
            {progressLabel}
          </div>
          <div className="tags-container">
            {/* {"تگ ها"} */}
            <ul className="tags-list">
              {tags.map((tag) => (
                <QuestionTag key={tag} tagLabel={tag} />
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
            {/* {"دکمه نمایش جواب"} */}
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
              {questionDetails}
            </div>

            <div className="question-feedback-btns">
              {/* dokme haaye feedback */}
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
