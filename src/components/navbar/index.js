import React from 'react';
import Navbar from 'react-bootstrap/Navbar'


export default function NavBar (){
return(
<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src="/logo192.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
Trogon Data System
    </Navbar.Brand>
  </Navbar>

)

}

