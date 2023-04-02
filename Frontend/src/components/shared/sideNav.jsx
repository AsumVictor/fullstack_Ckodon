import React from "react";
import "./style.css";

export default function SideNav(props) {
  console.log(props.isShow);
  return (
    <aside className={`sidebar ${props.isShow ? "show" : null}`}>
      <nav className="nav">{props.children}</nav>
    </aside>
  );
}
