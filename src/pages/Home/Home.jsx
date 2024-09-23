import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/users">Users</Link> | <Link to="/products">Products</Link>
      </nav>
    </div>
  );
};

export default Home;
