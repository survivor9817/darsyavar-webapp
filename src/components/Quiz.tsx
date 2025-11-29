import { useContext, useEffect, useState } from "react";
import FilterSelector from "./FilterSelector";
import { options } from "../data/filterOptionsData";
import { BookContext } from "./Layout";
import QuizView from "./QuizView";
import { requestedQuestionsIDs } from "../data/questionsData";

const Quiz = () => {
  const { currentBook } = useContext(BookContext);
  const [quizStatus, setQuizStatus] = useState("off");
  // const [session, setSession] = useState({
  //   // sessionId: generateSessionId(),
  //   sessionId: 1,
  //   startTime: new Date(),
  //   endTime: null,
  //   status: "in-progress",
  //   bookName: currentBook,
  //   filters: { Book: currentBook, Where: "", Level: "", Source: "" },
  //   currentQIndex: 0,
  //   currentQID: requestedQuestionsIDs[this.currentQIndex].id,
  //   questionsCount: requestedQuestionsIDs.length,
  //   feedbackResults: {},
  //   questionIDs: requestedQuestionsIDs,
  // });

  const [filtersData, setFiltersData] = useState({
    Book: currentBook,
    Where: "",
    Level: "",
    Source: "",
  });

  function resetFilters() {
    setFiltersData({
      Book: currentBook,
      Where: "",
      Level: "",
      Source: "",
    });
  }

  useEffect(() => {
    resetFilters();
  }, [currentBook]);

  function onFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const id = event.target.id;
    setFiltersData({ ...filtersData, [id]: value });
    console.log(filtersData);
  }

  function startQuiz(formData: FormData) {
    const filters = Object.fromEntries(formData);
    console.log(filters);
    console.log(filtersData);
    setQuizStatus("in-progress");
    resetFilters();
  }

  // progresive disclosure logic ##############################################
  const showLevel = filtersData.Where !== "";
  const showSource = filtersData.Level !== "";
  const showBtn = filtersData.Source !== "";
  const filterHeights = {
    // first: "116px",
    Where: "200px",
    Level: "286px",
    Source: "316px",
  };

  function getHeight() {
    if (showLevel && showSource && showBtn) {
      return filterHeights.Source;
    } else if (showLevel && showSource) {
      return filterHeights.Level;
    } else if (showLevel) {
      return filterHeights.Where;
    }
  }
  // ##########################################################################

  return (
    <>
      <div id="Quiz" className="tab-container">
        {/* FilterView */}
        {quizStatus === "off" ? (
          <form className="filter-section" action={startQuiz}>
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
        ) : null}

        {/* QuizView */}
        {quizStatus === "in-progress" ? <QuizView /> : null}
      </div>
    </>
  );
};

export default Quiz;
