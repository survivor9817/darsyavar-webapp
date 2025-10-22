import Book from "./Book";
import Fehrest from "./Fehrest";
import Menu from "./Menu";
import Quiz from "./Quiz";
import Yavar from "./Yavar";

const Layout = () => {
  // const styles = {
  //   fehrest: { transform: `translateX(${isFehrestOpen ? 0 : 105}%)` },
  //   menu: { transform: `translateX(${isMenuOpen ? 0 : -105}%)` },
  //   fehrestBack: { display: isFehrestOpen && isSmallScreen ? "block" : "none" },
  //   menuBack: { display: isMenuOpen ? "block" : "none" },
  //   tabIndicator: { transform: `translateX(${activeTab * -100}%)` },
  //   tabsContainer: { transform: `translateX(${activeTab * (100 / 3)}%)` },
  // };

  return (
    <>
      <Fehrest />
      <div className={`fehrest-backdrop`} /* style={style} */ /* onClick={x} */></div>

      <Menu />
      <div className={`menu-backdrop`} /* style={style} */ /* onClick={x} */></div>

      <div className="mid-section">
        <div className="navbar">
          <button className="nav-btn fehrest-btn" /* onClick={x} */>
            <i className="msr icon--fehrest"> list </i>
            <span className="tab-label"> فهرست </span>
          </button>
          <div className="tab-btns">
            <button className="nav-btn book-btn" /* onClick={x} */>
              <i className="msr icon--book"> menu_book </i>
              <span className="tab-label"> کتاب </span>
            </button>
            <button className="nav-btn quiz-btn" /* onClick={x} */>
              <i className="msr icon--quiz"> exercise </i>
              <span className="tab-label"> تمرین </span>
            </button>
            <button className="nav-btn yavar-btn" /* onClick={x} */>
              <i className="msr icon--yavar"> school </i>
              <span className="tab-label"> یاور </span>
            </button>
            <div className="active-tab-indicator" /* style={style} */></div>
          </div>
          <button className="nav-btn menu-btn" /* onClick={x} */>
            <i className="msr icon--menu"> menu </i>
            <span className="tab-label"> منو </span>
          </button>
        </div>

        <div className="tabs" /* style={style} */>
          <Book />
          <Quiz />
          <Yavar />
        </div>
      </div>
    </>
  );
};

export default Layout;
