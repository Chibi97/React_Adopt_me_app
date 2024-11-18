import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h2>
        There was an error with this listing.{" "}
        <Link to="/">Click here to go back to the homepage.</Link>
      </h2>
    </div>
  );
};

export default Error;
