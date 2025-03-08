import "../src/styles/styles.css";
import Services from "./Pages/Service";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact";
import Footer from "./components/Footer";
import Blog from "./Pages/Blog";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/home" element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
