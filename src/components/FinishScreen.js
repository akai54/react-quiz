function FinishScreen({ score, maxPosPoints }) {
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
      <p className="highscore">(Best score: X)</p>
    </div>
  );
}

export default FinishScreen;
