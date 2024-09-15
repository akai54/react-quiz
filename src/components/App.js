import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initalState = {
  questions: [],
  // status: "ready", "loading", "error", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  bestscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const curQst = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === curQst.correctOption
            ? state.score + curQst.points
            : state.score,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        bestscore:
          state.score > state.bestscore ? state.score : state.bestscore,
      };
    default:
      throw new Error("Invalid action type");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { questions, status, index, answer, score, bestscore } = state;

  const numQuestions = questions.length;
  const maxPosPoints = questions.reduce(
    (totalPpoints, curQuestion) => (totalPpoints += curQuestion.points),
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:4000/questions");
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              score={score}
              maxPosPoints={maxPosPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} index={index} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            maxPosPoints={maxPosPoints}
            bestscore={bestscore}
          />
        )}
      </Main>
    </div>
  );
}
