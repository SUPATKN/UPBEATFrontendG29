const ConfirmPlan = ({ Plan, setPlan, handleSubmit }) => {
  return (
    <div className="PlanArea">
      <label className="font">Enter Plan </label>
      <br></br>
      <textarea
        className="TextArea"
        type="text"
        value={Plan}
        onChange={(e) => setPlan(e.target.value)}
      />
      <button className={"pixel2"} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ConfirmPlan;
