import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner" data-testid="spinner">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
