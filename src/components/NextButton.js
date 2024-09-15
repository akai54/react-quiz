function NextButton({ dispatch, answer, index }) {
  if (answer === null) return null;

  const showRes = index === 14;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: showRes ? "finished" : "nextQuestion" })}
    >
      {showRes ? "Show Results" : "Next"}
    </button>
  );
}

export default NextButton;
