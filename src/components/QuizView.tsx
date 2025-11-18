import { useRef, useState } from "react";
import FeedbackMsg from "./FeedbackMsg";
import IconBtn from "./IconBtn";
import FeedbackBtn from "./FeedbackBtn";

const QuizView = () => {
  //   const questionObj = quiz.questions[quiz.observingQuestionID];
  //   const index = quiz.observingQuestionIndex;
  //   const questionsCount = quiz.questionsCount;

  const [isAnswerVisible, setAnswerVisible] = useState(false);
  const toggleAnswer = () => setAnswerVisible((prev) => !prev);
  const hideAnswer = () => setAnswerVisible(false);

  const feedbackItems = [
    {
      id: "correct",
      label: "درست گفتم!",
      icon: "check_circle",
      className: "correct",
      ref: useRef<HTMLLIElement>(null),
    },
    {
      id: "incorrect",
      label: "اشتباه گفتم!",
      icon: "cancel",
      className: "incorrect",
      ref: useRef<HTMLLIElement>(null),
    },
    {
      id: "like",
      label: "سؤال قشنگیه!",
      icon: "favorite",
      className: "like",
      ref: useRef<HTMLLIElement>(null),
    },
    {
      id: "star",
      label: "سؤال مهمیه!",
      icon: "stars",
      className: "star",
      ref: useRef<HTMLLIElement>(null),
    },
    {
      id: "report",
      label: "ایراد داره!",
      icon: "error",
      className: "report",
      ref: useRef<HTMLLIElement>(null),
    },
  ];

  const [btnState, setBtnState] = useState({
    correct: false,
    incorrect: false,
    like: false,
    star: false,
    report: false,
  });

  function toggleBtn(feedbackName: keyof typeof btnState) {
    setBtnState((prev) => ({
      ...prev,
      [feedbackName]: !prev[feedbackName],
    }));
  }

  function markCorrect() {
    setBtnState((prev) => ({
      ...prev,
      correct: !prev.correct,
      incorrect: false,
    }));
  }

  function markIncorrect() {
    setBtnState((prev) => ({
      ...prev,
      incorrect: !prev.incorrect,
      correct: false,
    }));
  }

  function updateFeedbackObj(name: keyof typeof btnState) {
    if (name === "correct") {
      markCorrect();
    } else if (name === "incorrect") {
      markIncorrect();
    } else {
      toggleBtn(name);
    }
  }

  // mitoonim be har feedbackMsg yek state daakheli bedim ke az biroon
  // props state migire vali az dakhel ham state darooni daare va khodesh
  // state daroonish ro
  // na tamame dg. estate btn modiriat beshe, feedbackam ref esh ro pasdadim be hamon btn
  // khode btn mitone feedbackmsg ro neshon bede va bardaare. mimoone daraavordane prevMsg.
  // man migam ye ref besaazim, pas bedim be hame dokme haa. ke agha in prevmsg e.

  console.log(isAnswerVisible);
  //   const {
  //     // id,
  //     bookName,
  //     question,
  //     // answerKey,
  //     descriptiveAnswer,
  //     author,
  //     source,
  //     date,
  //     score,
  //     tags,
  //     refs,
  //   } = questionObj;

  //   const currentIndex = toFaNums(index + 1);
  //   const total = toFaNums(questionsCount);

  //   const renderedTags = tags.map((tag) => (
  //     <li key={tag} className="tag">
  //       {tag}
  //     </li>
  //   ));

  //   const rendenedRefPages = Object.entries(refs).map(([refPage, { start, end }], index) => (
  //     <li key={index} className="ref-page" data-ref-page={toFaNums(+refPage)}>
  //       {toFaNums(+refPage)}
  //     </li>
  //   ));

  //   const refsList = () => (
  //     <li className="ref-book horizontally-scrollable">
  //       <span className="book">${bookName}</span>
  //       <ul className="pages horizontally-scrollable">{rendenedRefPages}</ul>
  //     </li>
  //   );

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
            <div className="progress-bar" id="ProgressBar" style={{ width: "300px" }}></div>
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
              {feedbackItems.map((feedbackItem) => (
                <FeedbackMsg
                  key={feedbackItem.id}
                  label={feedbackItem.label}
                  icon={feedbackItem.icon}
                  className={feedbackItem.className}
                  ref={feedbackItem.ref}
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
              {feedbackItems.map((feedbackItem) => (
                <FeedbackBtn
                  key={feedbackItem.id}
                  icon={feedbackItem.icon}
                  className={feedbackItem.className}
                  msgRef={feedbackItem.ref}
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
