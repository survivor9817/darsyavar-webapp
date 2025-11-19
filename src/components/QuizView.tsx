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

  const [feedBackData, setFeedBackData] = useState(feedbackItems);

  function toggleBtn(feedbackID: string) {
    const updatedFeedback = feedBackData.map((item) => {
      if (item.id === feedbackID) {
        return { ...item, isOn: !item.isOn };
      } else {
        return item;
      }
    });
    setFeedBackData(updatedFeedback);
  }

  function markCorrect() {
    const updatedFeedback = feedBackData.map((item) => {
      if (item.id === "correct") {
        return { ...item, isOn: !item.isOn };
      } else if (item.id === "incorrect") {
        return { ...item, isOn: false };
      } else {
        return item;
      }
    });
    setFeedBackData(updatedFeedback);
  }

  function markIncorrect() {
    const updatedFeedback = feedBackData.map((item) => {
      if (item.id === "incorrect") {
        return { ...item, isOn: !item.isOn };
      } else if (item.id === "correct") {
        return { ...item, isOn: false };
      } else {
        return item;
      }
    });
    setFeedBackData(updatedFeedback);
  }

  function hideAllMsgs() {
    const msgs = document.querySelectorAll(".feedback-msg-pop-in");
    msgs.forEach((msg) => msg.classList.remove("feedback-msg-pop-in"));
  }

  function updateFeedback(id: string) {
    hideAllMsgs();
    if (id === "correct") {
      markCorrect();
    } else if (id === "incorrect") {
      markIncorrect();
    } else {
      toggleBtn(id);
    }
  }

  console.log("feedback data:", feedBackData);

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
