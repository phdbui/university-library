import { Button } from './ui/button';
import Image from 'next/image';

// interface BorrowBookProps {
//   userId: string;
//   bookId: string;
//   borrowingEligibility: {
//     isEligible: boolean;
//     message: string;
//   };
// }

const BorrowBook = () => {
  return (
    <Button
      className="book-overview_btn"
      // onClick={handleBorrowBook}
      // disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {/* {false ? 'Borrowing ...' : 'Borrow Book'} */}
        Borrow Book
      </p>
    </Button>
  );
};

export default BorrowBook;
