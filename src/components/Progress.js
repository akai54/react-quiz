function Progress({ index, numQuestions, score, maxPosPoints }) {
  return (
    <header className="progress">
      <progress value={index + 1} max={numQuestions} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}{" "}
      </p>

      <p>
        <strong>{score}</strong>/ {maxPosPoints}
      </p>
    </header>
  );
}

export default Progress;
