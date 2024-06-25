import { gql, useQuery } from "@apollo/client";

export const GET_BOOKS = gql`
  query GET_BOOKS {
    Books {
      docs {
        id
        title
        author {
          name
        }
        description
        book_cover {
          url

          width
          height
        }
      }
    }
  }
`;

export type Book = {
  id: string;
  title: string;
  author: {
    name: string;
  };
  description: string;
  book_cover: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};
