import CloseBtn from "./CloseBtn";
import { bookNames } from "../data/booksData.js";
import FehrestItem from "./FehrestItem.tsx";
import { bookDataa } from "../data/booksDataa.js";

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

  const fehrestItems = bookDataa.sections.map((section) => {
    return <FehrestItem key={section.title} listItem={section} />;
  });

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
            {fehrestItems}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Fehrest;
