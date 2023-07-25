import React from "react";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand
        href="#home"
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <img
          alt=""
          src="/logoOama.png"
          width="40"
          height="40"
          className="d-inline-block align-top"
        />
        <Navbar.Text style={{ color: "white" }}>Trogon Data System</Navbar.Text>
      </Navbar.Brand>
    </Navbar>
  );
}
