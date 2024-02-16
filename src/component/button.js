const button = (props) => {
  const AllButton = props.Title;
  return (
    <div>
      {AllButton.map((AllButton) => (
        <button className="pixel2" key={AllButton.id}>
          {AllButton.title}
        </button>
      ))}
    </div>
  );
};

export default button;
