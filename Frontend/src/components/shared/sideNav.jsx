import React from "react";
import "./style.css";

export default function SideNav(props) {
  return (
    <aside className={`sidebar px-3 ${props.isShow ? "show" : null}`}>
      <nav className="nav">{props.children}</nav>
    </aside>
  );
}
