import { Navigate, useNavigate } from "react-router-dom"

const Homepage = () =>{
    const navigate = useNavigate();
 return (
    <div class="parent">
    <h1>Homepage</h1>
    <h2 onClick={()=>navigate("/login")}>Go to login page</h2>
    </div>
 )
}
export default Homepage