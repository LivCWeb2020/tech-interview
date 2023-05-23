import { Link } from "react-router-dom";
import '../App.css';

const Home = () => {
  return (
    <header className="App-header">
      <img src="https://cdn.bfldr.com/2Q1IPX6I/at/x93zgz9wcgg555ws87vk6g4/logomark" alt="logo" />
      <p>
        Welcome to Pluto!
      </p>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/experiments">Experiments</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default Home;