interface Props {
  className: string;
  icon: string;
  onClick?: () => void;
}

const IconBtn = ({ className, icon, onClick = undefined }: Props) => {
  return (
    <button className={className} onClick={onClick}>
      <i className="msr icon-btn"> {icon} </i>
    </button>
  );
};

export default IconBtn;
