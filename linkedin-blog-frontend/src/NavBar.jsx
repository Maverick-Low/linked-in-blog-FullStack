import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUser from './hooks/useUser';
import { signOut, getAuth } from 'firebase/auth';

function NavBar() {
    const {user} = useUser();
    const navigate = useNavigate();
  return (
    <nav>
        <ul>
            <li><Link to = "/"> Home </Link></li>
            <li><Link to="/about"> About </Link></li>
            <li><Link to="/Articles"> Articles </Link></li>
            {user 
                ? <button onClick = {() => {signOut(getAuth())}}> Log out </button> 
                :<button onClick={() => {navigate('/login')}}> Log in</button>
            }
        </ul>
    </nav>
  )
}

export default NavBar
