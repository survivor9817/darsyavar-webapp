// components/BookCard.tsx
import { type Book } from "../data/books";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  return (
    <div className="group min-w-[150px] bg-white rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="h-[180px] rounded-t-2xl overflow-hidden bg-gray-100">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>

      <div className="p-3 text-center">
        <p className="text-sm font-medium">{book.title}</p>
        <p className="text-xs text-gray-500 mt-1">{book.grade}</p>
      </div>
    </div>
  );
};

export default BookCard;
