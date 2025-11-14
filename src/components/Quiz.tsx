import { useContext, useEffect, useState } from "react";
import FilterSelector from "./FilterSelector";
import { options } from "../data/filterOptionsData";
import { BookContext } from "./Layout";
import QuizView from "./QuizView";

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

  const [quizStatus, setQuizStatus] = useState("off");
  // const [quiz, setQuiz] = useState("off");

  function startQuiz(formData: FormData) {
    const filters = Object.fromEntries(formData);
    console.log(filters);
    console.log(quizStatus);
    // const newQuiz = new Exercise(bookName, filters, exerciseData);
    // setQuiz(newQuiz);
    setQuizStatus("in-progress");
    resetFilters();
  }

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
              <button className="start-exercise-btn">
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
