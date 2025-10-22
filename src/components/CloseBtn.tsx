interface Props {
  onClick: () => void;
}

const CloseBtn = ({ onClick }: Props) => {
  return (
    <button className="closer-btn" onClick={onClick}>
      <i className="msr icon--cancel"> cancel </i>
    </button>
  );
};

export default CloseBtn;
