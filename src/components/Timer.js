import { useEffect } from "react";

function Timer({ dispatch, timer }) {
  const mins = Math.floor(timer / 60);
  const secs = timer % 60;

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    //Clean-up function
    return () => clearInterval(timerId);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins}:{secs < 10 && 0}
      {secs}
    </div>
  );
}
export default Timer;
