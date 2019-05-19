import React, { Component } from "react";
import Link from "next/link";

const Header = () => (
  <header className="navbar flex justify-between p-2">
    <section className="navbar-section">
      <div className="brand no-underline ">
        <Link href="/"><a>koko</a></Link>
      </div>
    </section>
    <section className="navbar-section">
      <div className="input-group input-inline">
        <Link href="/gallery"><a>Gallery</a></Link>
      </div>
    </section>
  </header>
);

export default Header;
