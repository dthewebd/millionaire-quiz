import { useState, useEffect } from "react";
import axios from "axios";
import { convertString } from "./services/convert";
import { fisherYatesShuffle } from "./services/shuffle";
import "./App.css";

interface Fetch {
  data?: {
    response_code: number;
    results: [
      {
        category: string;
        type: string;
        difficulty: string;
        question: string;
        correct_answer: string;
        incorrect_answers: [];
      }
    ];
  };
}

function App() {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [question, setQuestion] = useState<string>();
  const [multipleChoice, setMultipleChoice] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>();

  useEffect(() => {
    const fetchQuestion = async () => {
      const result: Fetch = await axios.get(
        "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple"
      );

      if (result.data) {
        const question: string = result.data.results[0].question;
        setQuestion(convertString(question));

        const correctAnswer: string = result.data.results[0].correct_answer;
        const wrongAnswers: [] = result.data.results[0].incorrect_answers;

        let multipleChoice = [...wrongAnswers, correctAnswer];

        fisherYatesShuffle(multipleChoice);
        setMultipleChoice(multipleChoice);
        setCorrectAnswer(correctAnswer);
        console.log(correctAnswer);
      }
    };

    fetchQuestion();
  }, [questionNumber]);

  function answer(e: any) {
    if (e.target.value === correctAnswer) {
      const nextQuestion = questionNumber + 1;
      setQuestionNumber(nextQuestion);
    }
  }

  return (
    <div>
      <div>
        <h1>{`${question}`}</h1>
      </div>
      <div>
        {multipleChoice.map((choice, i) => (
          <button key={i} value={choice} onClick={answer}>
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
