import { useState } from "react";
import FeedbackMsg from "./FeedbackMsg";
import IconBtn from "./IconBtn";
import FeedbackBtn from "./FeedbackBtn";
import { feedbackItems } from "../data/feedbackData";
// baa data pishfarz anjam midim badesh useefect mikonim

const QuizView = () => {
  //   const questionObj = quiz.questions[quiz.observingQuestionID];
  //   const index = quiz.observingQuestionIndex;
  //   const questionsCount = quiz.questionsCount;

  const [isAnswerVisible, setAnswerVisible] = useState(false);
  const toggleAnswer = () => setAnswerVisible((prev) => !prev);
  // const hideAnswer = () => setAnswerVisible(false);

  // mitoone ye hooke sefareshi bashe
  const [feedBackData, setFeedBackData] = useState(feedbackItems);

  // in logic kheyli react pasand nist va movaghate
  function hidePrevMsg(id: string) {
    if (feedBackData.find((item) => item.id === id)?.isOn) return;
    const msgs = document.querySelectorAll(".feedback-msg-pop-in");
    msgs.forEach((msg) => msg.classList.remove("feedback-msg-pop-in"));
  }

  function updateFeedback(id: string) {
    hidePrevMsg(id);
    setFeedBackData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) return { ...item, isOn: !item.isOn };
        const clickedOnCorrect = id === "correct" && item.id === "incorrect";
        const clickedOnIncorrect = id === "incorrect" && item.id === "correct";
        if (clickedOnCorrect || clickedOnIncorrect) return { ...item, isOn: false };
        return item;
      })
    );
  }

  const btnsState = feedBackData.reduce<Record<string, boolean>>((acc, item) => {
    acc[item.id] = item.isOn;
    return acc;
  }, {});
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
            className={"btn--exercise-prev"}
            icon={"arrow_circle_right"}
            // onClick={quiz.goToNextQuestion}
          />
          <IconBtn
            className={"btn--exercise-next"}
            icon={"arrow_circle_left"}
            // onClick={gonext}
          />
        </div>

        {/* <!-- Row 2 : Exercise Number and Tags --> */}
        <div className="number-tags-container">
          <div className="exercise-number">
            {/* {`تمرین شماره ${currentIndex} از ${total}`} */}
            {"شماره تمرین"}
          </div>
          <div className="tags-container">
            <ul className="tags-list">
              {/* {renderedTags} */}
              {"تگ ها"}
            </ul>
          </div>
        </div>

        {/* <!-- Row 3 : Exercise Number and Tags --> */}
        <div className="progress-wrapper">
          <div className="progress-container">
            <div className="progress-bar" id="ProgressBar" style={{ width: "30px" }}></div>
          </div>
        </div>

        {/* <!-- Row 4 : Question Box --> */}
        <div className="question-card">
          <div
            className="question-container"
            // dangerouslySetInnerHTML={{ __html: question }}
          >
            {"متن سوال"}
          </div>

          {/* <!-- user feedbacks --> */}
          <div className="feedback-msg-container">
            <ul className="feedback-msg-list">
              {feedBackData.map((item) => (
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
                {/* {author} */}
                {"نویسنده"}
              </span>
            </div>
          </div>
          <div className="details-inputBtns-container">
            <div className="exercise-details">
              {/* {`${source} - ${date} - ${toFaNums(score)} نمره`} */}
              {"نمره تاریخ منبع"}
            </div>
            <div className="quiz-feedback-btns">
              {feedBackData.map((item) => (
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
            // dangerouslySetInnerHTML={{ __html: descriptiveAnswer }}
          >
            {"متن جواب"}
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
