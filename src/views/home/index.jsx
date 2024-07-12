import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="bg-primary/20 container mx-auto rounded-md">
            <div className="py-8 my-20">
                <div className="flex justify-center items-center mb-5">
                    <h1>SISTEM INFORMASI LAUNDRY</h1>
                </div>
                <div className="flex justify-center items-center mb-5">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, delectus magnam voluptates commodi aperiam odit maxime cupiditate</p>
                </div>

                <div className="flex justify-center items-center">
                    <div className="btn btn-outline btn-primary">
                        <Link to="/login">LOGIN</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
