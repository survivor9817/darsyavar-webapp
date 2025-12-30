import { createContext, useContext, useEffect, useState } from "react";
import FilterSelector from "./FilterSelector";
import QuizView from "./QuizView";
import { BookContext } from "./Layout";
import { options } from "../data/filterOptionsData";
// import { QuizSession } from "../classes/QuizSession";

type QuizContextType = {
  quizStatus: string;
  setQuizStatus: (value: string) => void;
};

export const QuizContext = createContext<QuizContextType>({
  quizStatus: "",
  setQuizStatus: () => {},
});

const Quiz = () => {
  const { currentBook } = useContext(BookContext);
  const [quizStatus, setQuizStatus] = useState("off");

  function showQuestionView() {
    setQuizStatus("in-progress");
  }

  // make it in ref
  // const [session, setSession] = useState(new QuizSession(currentBook, {}, []));

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

  const [startQuizLoading, setStartQuizLoading] = useState(false);

  function startQuiz(formData: FormData) {
    setStartQuizLoading(true);
    const filters = Object.fromEntries(formData);
    console.log(filters);
    console.log(filtersData);

    // console.log(session);
    // setSession(new QuizSession(currentBook, filtersData, [1, 2, 3]));

    setTimeout(() => {
      showQuestionView();
      setStartQuizLoading(false);
      resetFilters();
    }, 1000);
    // showQuestionView();
  }

  // function endQuiz() {}

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

  // تغییر فوکوس روی اینپوت فیلتر بعدی
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

  const quizContextValue: QuizContextType = {
    quizStatus,
    setQuizStatus,
  };

  return (
    <>
      <QuizContext.Provider value={quizContextValue}>
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
                <button
                  type="submit"
                  className="w-[95.6%] h-12 mx-[2.2%] rounded-[193px] bg-black text-white cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={startQuizLoading}
                >
                  {startQuizLoading && (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>{startQuizLoading ? "در حال شروع تمرین..." : "شروع تمرین"}</span>
                </button>
              </div>
            </form>
          ) : null}

          {/* QuizView */}
          {quizStatus === "in-progress" ? <QuizView /> : null}
        </div>
      </QuizContext.Provider>
    </>
  );
};

export default Quiz;
