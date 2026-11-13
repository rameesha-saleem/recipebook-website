const ErrorMessage = ({ message = "Something went wrong." }) => {
  return (
    <div className="error-message">
      <div className="error-icon">!</div>

      <h3>Oops!</h3>

      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;