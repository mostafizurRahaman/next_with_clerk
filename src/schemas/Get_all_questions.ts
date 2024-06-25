import { gql, useQuery } from "@apollo/client";

export const GET_QUESTIONS = gql`
  query GET_QUESTIONS {
    Quizzes {
      docs {
        id
        quiz_title

        questions {
          id
          question {
            ... on Multiple_choice {
              question_title
              options {
                id
                option
                isCorrect
              }
            }
            ... on Single_choice {
              question_title
              options {
                id
                option
                isCorrect
              }
            }
            ... on AnsAnsQuestion {
              id
              question_title
              asnwer
            }
          }
        }
      }
    }
  }
`;

export type Question = {
  Quizzes: {
    docs: Array<{
      id: string;
      quiz_title: string;
      questions: Array<{
        id: string;
        question: Array<
          | {
              __typename: "Multiple_choice";
              id: string;
              question_title: string;
              options: Array<{
                option: string;
                isCorrect: boolean;
              }>;
            }
          | {
              __typename: "Single_choice";
              id: string;
              question_title: string;
              options: Array<{
                option: string;
                isCorrect: boolean;
              }>;
            }
          | {
              __typename: "AnsAnsQuestion";
              id: string;
              question_title: string;
              asnwer: string;
            }
        >;
      }>;
    }>;
  };
};
