import { useContext, useEffect, useState } from "react";
import FilterSelector from "./FilterSelector";
import { options } from "../data/filterOptionsData";
import { BookContext } from "./Layout";
import IconBtn from "./IconBtn";
import FeedbackMsg from "./FeedbackMsg";

const Quiz = () => {
  const [filtersData, setFiltersData] = useState({
    Where: "",
    Level: "",
    Source: "",
  });

  const showLevel = filtersData.Where !== "";
  const showSource = filtersData.Level !== "";
  const showBtn = filtersData.Source !== "";

  const filterHeightStyle = {
    // first: "116px",
    Where: "200px",
    Level: "286px",
    Source: "316px",
  };

  function getHeight() {
    if (showLevel && showSource && showBtn) {
      return filterHeightStyle.Source;
    } else if (showLevel && showSource) {
      return filterHeightStyle.Level;
    } else if (showLevel) {
      return filterHeightStyle.Where;
    }
  }

  // const heights = ["116px", "200px", "286px", "316px"];
  // const step = [showLevel, showSource, showBtn].filter(Boolean).length;
  // const height = heights[step];

  function onFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const id = event.target.id;
    setFiltersData({ ...filtersData, [id]: value });
    console.log(filtersData);
  }

  function resetFilters() {
    setFiltersData({
      Where: "",
      Level: "",
      Source: "",
    });
  }

  const { currentBook } = useContext(BookContext);
  useEffect(() => {
    resetFilters();
  }, [currentBook]);

  // function startQuiz(formData) {
  //   const filters = Object.fromEntries(formData);
  //   const newQuiz = new Exercise(bookName, filters, exerciseData);
  //   setQuiz(newQuiz);
  //   setQuizStatus(newQuiz.status);
  //   resetFilters();
  // }

  return (
    <>
      <div id="Quiz" className="tab-container">
        {/* FilterView */}
        <form className="filter-section" /* action={startQuiz} */>
          <div className="quiz-filters" style={{ height: getHeight() }}>
            <FilterSelector
              id={"Where"}
              label={"از کجای کتاب تمرین می‌خوای؟"}
              value={filtersData.Where}
              onChange={onFilterChange}
              options={options.Where}
            />

            <FilterSelector
              id="Level"
              label="در چه سطحی باشند؟"
              value={filtersData.Level}
              onChange={onFilterChange}
              options={options.Level}
            />

            <FilterSelector
              id="Source"
              label="از چه منبعی باشند؟"
              value={filtersData.Source}
              onChange={onFilterChange}
              options={options.Source}
            />
          </div>
          <div className={`btn-container ${showBtn ? "btn-visible" : null}`}>
            <button type="submit" className="start-exercise-btn">
              <span>شروع تمرین</span>
            </button>
          </div>
        </form>

        {/* QuizView */}
        {/* {quizStatus === "in-progress" ? <QuizView quiz={quiz} /> : null} */}
        <div
          id="ExercisesContainer"
          // className={`exercises-container ${isAnswerVisible ? "open" : null} `}
          className={`exercises-container `}
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
              <div className="progress-bar" id="ProgressBar"></div>
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
                <FeedbackMsg label={"درست گفتم!"} icon={"check_circle"} className={"correct"} />
                <FeedbackMsg label={"اشتباه گفتم!"} icon={"cancel"} className={"incorrect"} />
                <FeedbackMsg label={"سؤال قشنگیه!"} icon={"favorite"} className={"like"} />
                <FeedbackMsg label={"سؤال مهمیه!"} icon={"stars"} className={"star"} />
                <FeedbackMsg label={"ایراد داره!"} icon={"error"} className={"report"} />
              </ul>
            </div>
          </div>

          {/* <!-- Row 5 : Middle Row : answerToggle-authorLink-userInputs --> */}
          <div className="exercise__middle-bar">
            <div className="toggle-author-container">
              <button
                id="ShowAnswerBtn"
                className="btn--show-answer"
                // onClick={toggleAnswer}
              ></button>
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
              <div className="exercise-feedback-btns">
                <IconBtn icon={"check_circle"} className={"btn--correct"} />
                <IconBtn icon={"cancel"} className={"btn--incorrect"} />
                <IconBtn icon={"favorite"} className={"btn--like"} />
                <IconBtn icon={"stars"} className={"btn--star"} />
                <IconBtn icon={"error"} className={"btn--report"} />
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
      </div>
    </>
  );
};

export default Quiz;
