import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = ({ pageName = "" }) => {
  return (
    <div className="navigation">
      <Link to="/">Home </Link>
      <span className="rectangle-behind">/ {pageName}</span>
    </div>
  );
};

export default Navigation;
