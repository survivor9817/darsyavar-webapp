type Props = {
  onClose: () => void;
  onAction: () => void;
};

const QuizEndConfirm = ({ onClose, onAction }: Props) => {
  return (
    <>
      {/* Message */}
      <p className="text-center text-lg leading-6 mt-6 mb-6 p-4">
        می‌خوای این جلسه تمرین رو تموم کنی؟
      </p>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        <button
          className="rounded-full bg-black text-white px-6 py-2 transition-colors hover:bg-neutral-700 active:bg-neutral-800 w-lg h-10 cursor-pointer"
          onClick={onAction}
        >
          بله
        </button>

        <button
          className="rounded-full bg-gray-200 text-black px-6 py-2 transition-colors hover:bg-gray-300 active:bg-gray-400 w-lg h-10 cursor-pointer"
          onClick={onClose}
        >
          خیر
        </button>
      </div>
    </>
  );
};

export default QuizEndConfirm;
