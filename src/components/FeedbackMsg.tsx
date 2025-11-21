type Props = {
  icon: string;
  label: string;
  className: string;
  isOn: boolean;
};

const FeedbackMsg = ({ icon, label, className, isOn }: Props) => {
  const popInClass = isOn ? "feedback-msg-pop-in" : "";

  return (
    <li id={`id-${className}`} className={`feedback-msg feedback-msg-${className} ${popInClass}`}>
      <i className="msr"> {icon} </i>
      <span> {label} </span>
    </li>
  );
};

export default FeedbackMsg;
