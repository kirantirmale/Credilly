import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Skils from "../components/Skils";
import Leadership from "../components/Leadership";
import Founder from "../components/Founder";
import BookCar from "../components/BookCar";


function Home() {
  return (
    <>
      <Hero />
      <BookCar/>
      <Founder/>
      <Skils />
      <Leadership/>
    </>
  );
}

export default Home;
