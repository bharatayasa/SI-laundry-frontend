import AppRoutes from './routes';
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div >
    {/*  */}
      <div className="container flex justify-center items-center mx-auto px-4 py-6">
        <div>
          <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <li>
                <div>
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </Link>
                </div>
            </li>
          </ul>
        </div>
      </div>
      {/*  */}
    <div>
      <AppRoutes />
    </div>
  </div>
  )
}