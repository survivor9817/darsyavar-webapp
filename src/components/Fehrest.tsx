import CloseBtn from "./CloseBtn";
import { bookNames } from "../data/booksData.js";

type Props = {
  onClose: () => void;
  style: object;
  // bookName: string;
  // onChange: () => void;
};

const Fehrest = ({ onClose, style }: Props) => {
  const bookItems = bookNames.map((bookName) => (
    <option key={bookName} value={bookName}>
      {bookName}
    </option>
  ));

  return (
    <>
      <div className="sidebar sidebar-right" style={style}>
        <CloseBtn onClick={onClose} />

        <div className="fehrest-section">
          <header className="fehrest-header">
            <label htmlFor="BookSelector" className="book-selector-label">
              فهرست کتاب
            </label>
            <select
              id="BookSelector"
              name="BookSelector"
              className="book-selector"
              // value={bookName}
              // onChange={onChange}
            >
              {bookItems}
            </select>
          </header>
          <ol id="fehrestList" className="fehrest-list">
            <li>
              <div className="chapter">something</div>
              <ol className="subsections">
                <li>
                  <div className="article">something</div>
                </li>
                <li>
                  <div className="article">something</div>
                </li>
                <li>
                  <div className="article">something</div>
                </li>
              </ol>
            </li>
            <li>
              <div className="chapter">something</div>
              <ol className="subsections">
                <li>
                  <div className="article">something</div>
                </li>
                <li>
                  <div className="article">something</div>
                </li>
                <li>
                  <div className="article">something</div>
                </li>
              </ol>
            </li>
            <li>
              <div className="chapter">something</div>
            </li>
            <li>
              <div className="chapter">something</div>
            </li>
            {/* <FehrestList fehrestData={fehrest} /> */}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Fehrest;
