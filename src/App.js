import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";

const initalState = {
  questions: [],
  // status: "ready", "loading", "error", "active", "finished"
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Invalid action type");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { question, status } = state;

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
  });

  return (
    <div className="app">
      <Header />
      <Main>{status === "loading" && <Loader />}</Main>
    </div>
  );
}
