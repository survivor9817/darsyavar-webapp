type Props = {
  className: string;
  icon: string;
  label: string;
  onClick?: () => void;
  ref?: React.RefObject<HTMLLIElement | null>;
};

const FeedbackMsg = ({ icon, label, className, ref }: Props) => {
  return (
    <li id={`id-${className}`} className={`feedback-msg feedback-msg-${className}`} ref={ref}>
      <i className="msr"> {icon} </i>
      <span> {label} </span>
    </li>
  );
};

export default FeedbackMsg;
