import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Book from "./Book";
import Fehrest from "./Fehrest";
import Menu from "./Menu";
import Quiz from "./Quiz";
import Yavar from "./Yavar";

export const BookContext = createContext<{}>({});

const Layout = () => {
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", 0);
  const [isFehrestOpen, setIsFehrestOpen] = useLocalStorage("isFehrestOpen", false);
  const [isMenuOpen, setIsMenuOpen] = useLocalStorage("isMenuOpen", false);
  const [wasFehrestOpen, saveFehrestState] = useLocalStorage("wasFehrestOpened", false);

  const isSmallScreen = useMediaQuery("(max-width: 1440px)");

  const styles = {
    fehrest: { transform: `translateX(${isFehrestOpen ? 0 : 105}%)` },
    menu: { transform: `translateX(${isMenuOpen ? 0 : -105}%)` },
    fehrestBack: { display: isFehrestOpen && isSmallScreen ? "block" : "none" },
    menuBack: { display: isMenuOpen ? "block" : "none" },
    tabIndicator: { transform: `translateX(${activeTab * -100}%)` },
    tabsContainer: { transform: `translateX(${activeTab * (100 / 3)}%)` },
  };

  function closeFehrest() {
    setIsFehrestOpen(false);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleFehrest() {
    setActiveTab(0);
    setIsFehrestOpen((prev: boolean) => !prev);
    !isFehrestOpen && history.pushState({ isFehrestVisible: true }, "");
  }

  function toggleMenu() {
    setIsMenuOpen((prev: boolean) => !prev);
    !isMenuOpen && history.pushState({ isMenuVisible: true }, "");
  }

  function goToBook() {
    setActiveTab(0);
    wasFehrestOpen && setIsFehrestOpen(true);
    saveFehrestState(false);
  }

  function goToQuiz() {
    isFehrestOpen && saveFehrestState(isFehrestOpen);
    closeFehrest();
    setActiveTab(1);
  }

  function goToYavar() {
    isFehrestOpen && saveFehrestState(isFehrestOpen);
    closeFehrest();
    setActiveTab(2);
  }

  useEffect(() => {
    function onPopstate() {
      if (isMenuOpen) {
        closeMenu();
      } else if (isFehrestOpen) {
        closeFehrest();
      }
    }
    window.addEventListener("popstate", onPopstate);
    return () => window.removeEventListener("popstate", onPopstate);
  }, [isMenuOpen, isFehrestOpen]);

  const [currentBook, setCurrentBook] = useState("علوم تجربی ۷");
  const [currentPage, setCurrentPage] = useLocalStorage<number | string>(currentBook, 1);

  function changeBook(event: React.ChangeEvent<HTMLSelectElement>) {
    const newBookName = event.target.value;
    setCurrentBook(newBookName);
  }

  const bookContextValue = {
    currentBook,
    setCurrentBook,
    currentPage,
    setCurrentPage,
  };

  return (
    <BookContext.Provider value={bookContextValue}>
      <>
        <Fehrest style={styles.fehrest} onClose={closeFehrest} onChange={changeBook} />
        <div className={`fehrest-backdrop`} style={styles.fehrestBack} onClick={closeFehrest}></div>

        <Menu style={styles.menu} onClose={closeMenu} />
        <div className={`menu-backdrop`} style={styles.menuBack} onClick={closeMenu}></div>

        <div className="mid-section">
          <div className="navbar">
            <button className="nav-btn fehrest-btn" onClick={toggleFehrest}>
              <i className="msr icon--fehrest"> list </i>
              <span className="tab-label"> فهرست </span>
            </button>
            <div className="tab-btns">
              <button className="nav-btn book-btn" onClick={goToBook}>
                <i className="msr icon--book"> menu_book </i>
                <span className="tab-label"> کتاب </span>
              </button>
              <button className="nav-btn quiz-btn" onClick={goToQuiz}>
                <i className="msr icon--quiz"> exercise </i>
                <span className="tab-label"> تمرین </span>
              </button>
              <button className="nav-btn yavar-btn" onClick={goToYavar}>
                <i className="msr icon--yavar"> school </i>
                <span className="tab-label"> یاور </span>
              </button>
              <div className="active-tab-indicator" style={styles.tabIndicator}></div>
            </div>
            <button className="nav-btn menu-btn" onClick={toggleMenu}>
              <i className="msr icon--menu"> menu </i>
              <span className="tab-label"> منو </span>
            </button>
          </div>

          <div className="tabs" style={styles.tabsContainer}>
            <Book
            // currentBook={currentBook}
            // currentPage={currentPage}
            // setCurrentPage={setCurrentPage}
            />
            <Quiz />
            <Yavar />
          </div>
        </div>
      </>
    </BookContext.Provider>
  );
};

export default Layout;
