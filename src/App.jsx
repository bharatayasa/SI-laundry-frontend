import AppRoutes from './routes';
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
    <nav>
      <div>
        <Link to="/">HOME</Link>
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span></span>
        </button>
        <div id="navbarSupportedContent">
          <ul>
            <li>
              <a aria-current="page">Laundry</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div>
      <AppRoutes />
    </div>
  </div>
  )
}