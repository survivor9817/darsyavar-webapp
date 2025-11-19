import { useEffect, useRef, useState } from "react";

type Props = {
  icon: string;
  label: string;
  className: string;
  isOn: boolean;
};

const FeedbackMsg = ({ icon, label, className, isOn }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const popInClass = isVisible ? "feedback-msg-pop-in" : "";

  const prevTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (prevTimeout.current !== null) {
      clearTimeout(prevTimeout.current);
      prevTimeout.current = null;
    }

    if (!isOn) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    prevTimeout.current = window.setTimeout(() => {
      setIsVisible(false);
      prevTimeout.current = null;
    }, 1500);

    return () => {
      if (prevTimeout.current !== null) {
        clearTimeout(prevTimeout.current);
        prevTimeout.current = null;
      }
    };
  }, [isOn]);

  return (
    <li id={`id-${className}`} className={`feedback-msg feedback-msg-${className} ${popInClass}`}>
      <i className="msr"> {icon} </i>
      <span> {label} </span>
    </li>
  );
};

export default FeedbackMsg;
