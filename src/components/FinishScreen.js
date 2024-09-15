function FinishScreen({ score, maxPosPoints, bestscore, dispatch }) {
  const correctPercentage = (score / maxPosPoints) * 100;

  const getEmoji = (percentage) => {
    if (percentage === 100) return "🎖️";
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "🥳";
    return "🙅";
  };

  const emoji = getEmoji(correctPercentage);

  return (
    <div>
      <p className="result">
        {emoji} Your score is <strong>{score}</strong> out of {maxPosPoints} (
        {Math.ceil(correctPercentage)}%)
      </p>
      <p className="highscore">(Best score: {bestscore})</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "ready" })}
      >
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
