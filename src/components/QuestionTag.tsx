type Props = {
  tagLabel: string;
};

const QuestionTag = ({ tagLabel }: Props) => {
  return (
    <>
      <li className="tag">{tagLabel}</li>
    </>
  );
};

export default QuestionTag;
