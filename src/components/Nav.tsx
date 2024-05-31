import React from "react";
import { Link ,useNavigate} from "react-router-dom";
const Nav:React.FC=()=>{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/signup')
     

    }
    return<>
    <div>
          { auth? <ul className="Nav-ul">
                <li><Link to="/">products</Link></li>
                <li><Link to="/add">add products</Link></li>
                <li><Link to="/update/:id">update products</Link></li>
                <li><Link to="/create-order">CreateOrder</Link></li>
                <li><Link to="/create-review">CreateReview</Link></li>
                <li><Link to="/orders">OrderList</Link></li>
                <li><Link to="/reviews">ReviewList</Link></li>
               

                <li><Link onClick={logout} to="/signup">logout</Link></li>
                </ul>
                :<ul className=" Nav-ul ">
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
        
               
 
}
        </div>
    </>
}
export default Nav