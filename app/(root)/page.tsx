/* eslint-disable no-undef */
import BookList from '@/components/BookList';
import BookOverview from '@/components/BookOverview';
import { sampleBooks } from '@/constants';

export default function Home() {
  return (
    <>
      <BookOverview {...sampleBooks[0]} createdAt={new Date()} userId="1" />

      <BookList
        books={sampleBooks as Book[]}
        title="Latest Books"
        className="mt-28"
      />
    </>
  );
}
