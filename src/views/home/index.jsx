import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div>
                <h1>SISTEM INFORMASI LAUNDRY</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, delectus magnam voluptates commodi aperiam odit maxime cupiditate culpa omnis deserunt error nisi id ipsa, laudantium accusantium illum ipsum. Ea, accusantium!</p>
                <hr />
                {/* <Link to="/register" className="btn btn-primary btn-lg me-3">REGISTER</Link> */}
                <Link to="/login">LOGIN</Link>
            </div>
        </div>
    )
}
