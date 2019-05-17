import React, { Component } from "react";
import Link from "next/link";

const Header = () => (
  <header className="navbar p-2">
    <section className="navbar-section">
      <div className="brand no-underline ">
        <Link href="/">koko</Link>
      </div>
    </section>
    <section className="navbar-section">
      <div className="input-group input-inline">
        <input className="form-input" type="text" placeholder="search" />
        <button className="btn btn-primary input-group-btn">Search</button>
      </div>
    </section>
  </header>
);

export default Header;
