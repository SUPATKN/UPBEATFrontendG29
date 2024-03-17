const Button = ({ Title, handleClick, Ready, isMe }) => {
  return (
    <div>
      {Title === "Start Game" ? (
        <button
          className={!Ready ? "pixel2Start" : "pixel2"}
          onClick={handleClick}
        >
          {Title}
        </button>
      ) : (
        <button className={"pixel2"} onClick={handleClick}>
          {Title}
        </button>
      )}
    </div>
  );
};

export default Button;
