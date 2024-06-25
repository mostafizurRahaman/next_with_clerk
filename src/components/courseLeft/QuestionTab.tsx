"use client";

import { useEffect, useState } from "react";
import { Typography } from "../ui/Typography";

import client from "@/lib/apolloClient";
import { GET_QUESTIONS, Question } from "@/schemas/Get_all_questions";
import { useQuery } from "@apollo/client";

const QuestionTab = () => {
  const [selectedOption, setSelectedOption] = useState<number[]>([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    {
      question_title: string;
      options: { option: string; isCorrect: boolean }[];
    }[]
  >([]);

  const { loading, error, data } = useQuery<Question>(GET_QUESTIONS, {
    client,
  });

  useEffect(() => {
    if (data) {
      const quizzes = data.Quizzes?.docs ?? [];

      // Extract question titles and options
      const extractedData = quizzes.flatMap((quiz) =>
        quiz.questions.flatMap((questionItem) =>
          questionItem.question.flatMap((q) => {
            if (
              q.__typename === "Multiple_choice" ||
              q.__typename === "Single_choice"
            ) {
              return {
                question_title: q.question_title,
                options: q.options.map((opt) => ({
                  option: opt.option,
                  isCorrect: opt.isCorrect,
                })),
              };
            }
            return [];
          })
        )
      );

      setQuestionsAndAnswers(extractedData);

      // Initialize selectedOptions array with null values
      setSelectedOption(new Array(extractedData.length).fill(null));
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleOptionChange = (questionIdx: number, optionIdx: number) => {
    const updatedSelectedOption = [...selectedOption];
    updatedSelectedOption[questionIdx] = optionIdx;
    setSelectedOption(updatedSelectedOption);
  };

  return (
    <div>
      <div className="gap-4">
        {questionsAndAnswers?.map((item, questionIdx) => (
          <div key={questionIdx}>
            {/* Question */}
            <div className="mt-10 mb-2 flex justify-between align-middle">
              <Typography
                variant="SemiBold_H5"
                className="text-brand_black block"
              >
                {questionIdx + 1}. {item.question_title}
              </Typography>
              <Typography variant="SemiBold_H5" className="text-orange_ block">
                {questionIdx + 1}/{questionsAndAnswers.length}
              </Typography>
            </div>

            {/* Options */}
            <div className="my-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {item.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`${
                    selectedOption[questionIdx] === optIndex && "bg-orange_/10"
                  } px-6 py-3 border flex gap-5 hover:bg-orange_/10 duration-300 cursor-pointer`}
                  onClick={() => handleOptionChange(questionIdx, optIndex)}
                >
                  <label
                    className="relative flex items-center justify-center rounded-full cursor-pointer"
                    htmlFor={`option-${questionIdx}-${optIndex}`}
                  >
                    <input
                      type="radio"
                      name={`question-${questionIdx}`}
                      className="peer relative h-6 w-6 cursor-pointer appearance-none border checked:border-orange_ transition-all checked:bg-orange_"
                      id={`option-${questionIdx}-${optIndex}`}
                      checked={selectedOption[questionIdx] === optIndex}
                      onChange={() => handleOptionChange(questionIdx, optIndex)}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      ✓
                    </span>
                  </label>
                  <Typography
                    variant="Regular_H5"
                    className="text-brand_black block"
                  >
                    {option.option}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionTab;
