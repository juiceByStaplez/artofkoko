import React, { Component, Fragment } from "react";
import Header from "../components/Layout/Header";

import "../scss/style.scss";

const Page = ({ children }) => (
  <Fragment>
    <Header />
    <main className="flex-col bg-black">{children}</main>
  </Fragment>
);

export default Page;
