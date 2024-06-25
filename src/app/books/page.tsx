"use client";

import { gql, useQuery } from "@apollo/client";
import client from "../../lib/apolloClient";
import { Book, GET_BOOKS } from "@/schemas/Get_all_books";

type Chapter = {
  id: string;
  title: string;
  book: string;
  duration: number;
};

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const books: Book[] = data?.Books?.docs ?? [];
  console.log(books);

  return (
    <div>
      <h1 className="font-bold text-center mt-10 text-3xl">Book Page</h1>
      <div>
        <h1>Books</h1>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>by {book.author.name}</p>
              <p>{book.description}</p>
              {/* {book.book_cover && (
                <img
                  src={book.book_cover.url}
                  alt={book.book_cover.alt}
                  width={book.book_cover.width}
                  height={book.book_cover.height}
                />
              )} */}
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Books;
