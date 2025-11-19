type Props = {
  className: string;
  icon: string;
  onClick?: () => void;
  isOn: boolean;
};

const FeedbackBtn = ({ className, icon, onClick, isOn }: Props) => {
  return (
    <button className={`btn--${className} ${isOn ? "filled" : ""}`} onClick={onClick}>
      <i className="msr icon-btn"> {icon} </i>
    </button>
  );
};

export default FeedbackBtn;
