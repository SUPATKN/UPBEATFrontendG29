import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
const ConfirmPlan = ({
  Plan,
  setPlan,
  handleSubmit,
  intMin,
  intSec,
  initial,
  click,
}) => {
  return (
    <div className="PlanBoard">
      <div className="PlanArea">
        {!initial ? (
          <CountdownTimer minutes={intMin} seconds={intSec} />
        ) : (
          <CountdownTimer minutes={30} seconds={0} />
        )}

        <label className="font">Enter Plan </label>
        <br></br>
        <textarea
          className="TextArea"
          type="text"
          spellCheck="false"
          value={Plan}
          onChange={(e) => setPlan(e.target.value)}
        />
        <button
          className={"pixel2"}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ConfirmPlan;
