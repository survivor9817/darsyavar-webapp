import { useState } from "react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";

const grades = ["هفتم", "هشتم", "نهم", "دهم", "یازدهم", "دوازدهم"];
const majors = ["تجربی", "ریاضی", "انسانی"];

const MainPage = () => {
  const [selectedGrade, setSelectedGrade] = useState<string | null>("هفتم");
  const [selectedMajor, setSelectedMajor] = useState("تجربی");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showMajor =
    selectedGrade === "دهم" || selectedGrade === "یازدهم" || selectedGrade === "دوازدهم";

  const filteredBooks = books.filter((book) => {
    if (!selectedGrade) return false;
    if (book.grade !== selectedGrade) return false;
    if (showMajor && book.major !== selectedMajor) return false;
    return true;
  });

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen text-gray-800">
      {/* Container */}
      <div className="max-w-200 mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-4">
          <h1 className="font-bold text-lg">درس‌یاور</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100"
          >
            ورود | ثبت‌نام
          </button>
        </header>

        {/* Hero */}
        <section className="px-4 py-8 flex flex-col md:flex-row items-center gap-8">
          <h2 className="text-xl font-semibold md:w-1/2">
            با درس‌یاور، همین حالا درس خواندن رو شروع کن!
          </h2>

          <img src="/character.png" alt="character" className="w-[220px] mx-auto" />
        </section>

        {/* Grade Filter */}
        <section className="px-4">
          <p className="text-sm text-gray-600 mb-3">لطفا پایه مورد نظرتان را انتخاب کنید:</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-2 rounded-full text-sm border transition
                  ${
                    selectedGrade === grade
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {grade}
              </button>
            ))}
          </div>

          {showMajor && (
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="mb-6 px-3 py-2 rounded-lg border border-gray-300 bg-white"
            >
              {majors.map((major) => (
                <option key={major}>{major}</option>
              ))}
            </select>
          )}
        </section>

        {/* Books */}
        <section className="px-4 mb-10">
          <div className="flex gap-4 overflow-x-auto pb-3">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Strengths */}
        <section className="px-4 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">چرا درس‌یاور؟</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• دسترسی سریع و ساده</li>
              <li>• طراحی مخصوص دانش‌آموز</li>
              <li>• تجربه روان در موبایل و وب</li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-6 border-t text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <span>© درس‌یاور</span>
            <div className="flex gap-4">
              <span>نماد اعتماد</span>
              <span>قوانین</span>
              <span>تماس با ما</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal (همون قبلی، دست نخورده) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // 👈 کلیک روی بک‌دراپ
        >
          <div
            className="bg-white w-[90%] max-w-sm rounded-2xl p-5"
            onClick={(e) => e.stopPropagation()} // 👈 جلوگیری از بسته شدن
          >
            <h3 className="font-semibold mb-4 text-center">ورود یا ثبت‌نام در درس‌یاور</h3>

            <input
              type="tel"
              placeholder="شماره موبایل"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
            />

            <p className="text-xs text-gray-500 mb-4">
              ورود شما به معنای پذیرش شرایط درس‌یاور و قوانین حریم‌خصوصی است.
            </p>

            <div className="flex gap-2">
              <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg">ادامه</button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border border-gray-300 py-2 rounded-lg"
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
