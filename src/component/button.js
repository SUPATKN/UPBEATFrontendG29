const Button = ({ Title, handleClick, Ready }) => {
  return (
    <div>
      <button
        className={Title === "Start Game" || !Ready ? "pixel2Start" : "pixel2"}
        onClick={handleClick}
      >
        {Title}
      </button>
    </div>
  );
};

export default Button;
