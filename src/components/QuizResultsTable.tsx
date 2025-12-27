const QuizResultsTable = () => {
  const results = {
    correct: 5,
    incorrect: 4,
    unAnswered: 1,
    totalQuestions: 10,
  };

  return (
    <>
      {/* result table */}
      <div className="mt-4 mb-6 overflow-hidden rounded-xl border border-gray-300">
        <table className="w-full border-separate border-spacing-0">
          <thead className="bg-gray-200">
            <tr>
              <th className="border-gray-400 px-4 py-3 text-right text-sm font-bold text-gray-900">
                پاسخ
              </th>
              <th className="border-gray-400 px-4 py-3 text-center text-sm font-bold text-gray-900">
                تعداد
              </th>
              <th className="border-gray-400 px-4 py-3 text-center text-sm font-bold text-gray-900">
                درصد
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th
                scope="row"
                className="border-t border-gray-300 bg-green-50 px-4 py-3 text-right font-medium text-green-800"
              >
                درست
              </th>
              <td className="border-t border-gray-300 bg-green-50 px-4 py-3 text-center font-semibold text-green-600">
                ۳
              </td>
              <td className="border-t border-gray-300 bg-green-50 px-4 py-3 text-center font-semibold text-green-600">
                ۳۰٪
              </td>
            </tr>

            <tr>
              <th
                scope="row"
                className="border-t border-gray-300 bg-red-50 px-4 py-3 text-right font-medium text-red-800"
              >
                نادرست
              </th>
              <td className="border-t border-gray-300 bg-red-50 px-4 py-3 text-center font-semibold text-red-600">
                ۴
              </td>
              <td className="border-t border-gray-300 bg-red-50 px-4 py-3 text-center font-semibold text-red-600">
                ۴۰٪
              </td>
            </tr>

            <tr>
              <th
                scope="row"
                className="border-t border-gray-300 bg-gray-50 px-4 py-3 text-right font-medium text-gray-800"
              >
                نزده
              </th>
              <td className="border-t border-gray-300 bg-gray-50 px-4 py-3 text-center font-semibold text-gray-600">
                ۳
              </td>
              <td className="border-t border-gray-300 bg-gray-50 px-4 py-3 text-center font-semibold text-gray-600">
                ۳۰٪
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuizResultsTable;
