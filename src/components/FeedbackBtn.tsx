import { useState } from "react";

interface Props {
  className: string;
  icon: string;
  onClick?: () => void;
  msgRef?: React.RefObject<HTMLLIElement | null>;
}

const FeedbackBtn = ({ className, icon, onClick, msgRef }: Props) => {
  const [isFilled, setIsFilled] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    // تغییر وضعیت filled
    setIsFilled((prev) => !prev);
    if (msgRef?.current) {
      msgRef.current.classList.add("show");
    }
  }

  return (
    <button className={`btn--${className} ${isFilled ? "filled" : ""}`} onClick={handleClick}>
      <i className="msr icon-btn"> {icon} </i>
    </button>
  );
};

export default FeedbackBtn;
