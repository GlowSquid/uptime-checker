import Header from "./Header";
import Footer from "./Footer";
import Head from "../components/Head";

import "../styles/app.css";

const Layout = props => (
  <div>
    <Head />
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default Layout;
