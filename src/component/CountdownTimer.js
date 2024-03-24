import { useState, useEffect } from "react";
const CountdownTimer = ({ minutes = 0, seconds = 0 }) => {
    const [remainingTime, setRemainingTime] = useState({
      minutes: minutes,
      seconds: seconds,
    });
  
    useEffect(() => {
      let timer = setInterval(() => {
        const { minutes, seconds } = remainingTime;
        if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
        } else {
          if (seconds === 0) {
            setRemainingTime({
              minutes: minutes - 1,
              seconds: 59,
            });
          } else {
            setRemainingTime({
              minutes: minutes,
              seconds: seconds - 1,
            });
          }
        }
      }, 1000);
  
      return () => clearInterval(timer);
    }, [remainingTime]);
  
    return (
      <div>
        <p className="font">
          Time Remaining:{" "}
          {`${remainingTime.minutes.toString().padStart(2, "0")}:${remainingTime.seconds
            .toString()
            .padStart(2, "0")}`}
        </p>
      </div>
    );
  };
  export default CountdownTimer;