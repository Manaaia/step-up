import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>StepUp</h1>
        <p>
          Welcome to StepUp!
        </p>
        <Link
          className="App-link"
          to="clients"
        >
          Client list
        </Link>
      </header>
    </div>
  )
}

export default Home
