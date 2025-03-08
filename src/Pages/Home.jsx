import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Skils from "../components/Skils";
import Leadership from "../components/Leadership";
import Founder from "../components/Founder";
import BookCar from "../components/BookCar";
import IdeationServices from "../components/IdeationServices";


function Home() {
  return (
    <>
      <Hero />
      <BookCar/>
      <Founder/>
      <Skils />
      <IdeationServices/>
      {/* <Leadership/> */}
    </>
  );
}

export default Home;
