interface Props {
  className: string;
  icon: string;
  iconClassName?: string;
  onClick?: () => void;
}

const IconBtn = ({ className, icon, iconClassName = ``, onClick = undefined }: Props) => {
  return (
    <button className={className} onClick={onClick}>
      <i className={`msr icon-btn ${iconClassName}`}> {icon} </i>
    </button>
  );
};

export default IconBtn;
