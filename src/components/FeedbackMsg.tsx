type Props = {
  className: string;
  icon: string;
  label: string;
  onClick?: () => void;
};

const FeedbackMsg = ({ icon, label, className }: Props) => {
  return (
    <li className={`feedback-msg ${className}`}>
      <i className="msr"> {icon} </i>
      <span> {label} </span>
    </li>
  );
};

export default FeedbackMsg;
