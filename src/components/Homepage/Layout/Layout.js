import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <>
          <Header />
          <WrappedComponent />
          <Footer />
        </>
      );
    }
  };
};

export default Layout;
