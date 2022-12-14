import { Link } from "react-router-dom"

const Clients = () => {
  return (
    <div>
      <h1>Clients</h1>
      <div>
        <ul>
          <li>Client 1</li>
          <li>Client 2</li>
          <li>Client 3</li>
        </ul>
      </div>
      <Link
        className="App-link"
        to="/"
      >
        Home
      </Link>
    </div>
  )
}

export default Clients
