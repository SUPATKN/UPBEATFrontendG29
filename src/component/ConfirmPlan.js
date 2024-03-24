const ConfirmPlan = ({ Plan, setPlan, handleSubmit,click }) => {
  return (
    <div className="PlanBoard">
      <div className="PlanArea">
      <label className="font">Enter Plan </label>
      <br></br>
      <textarea
        className="TextArea"
        type="text"
        spellCheck ="false"
        value={Plan}
        onChange={(e) => setPlan(e.target.value)}
      />
      <button className={"pixel2"} onClick={()=>{
        handleSubmit()
        click()
      }}>
        Submit
      </button>
    </div>
    </div>
  );
};

export default ConfirmPlan;
