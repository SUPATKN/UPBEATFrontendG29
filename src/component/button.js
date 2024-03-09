const Button = ({ Title, handleClick, Ready, isMe }) => {
  return (
    <div>
      <button
        className={
          Title === "Start Game" || Title === "Play Game" || !isMe
            ? "pixel2Start"
            : "pixel2"
        }
        onClick={handleClick}
      >
        {Title}
      </button>
    </div>
  );
};

export default Button;
