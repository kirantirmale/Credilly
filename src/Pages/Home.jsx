import Hero from "../components/Hero";

import Leadership from "../components/Leadership";
import Founder from "../components/Founder";
import BookCar from "../components/BookCar";
import IdeationServices from "../components/IdeationServices";
import ServiceCard from "../components/ServicecCard";
import Banks from "../components/Banks";
import MainStepper from "../components/MainStepper";


function Home() {
  return (
    <>
      <Hero />
      <MainStepper/>
      {/* <BookCar/> */}
      <Founder/>
      <Banks />
      <IdeationServices/>
      <ServiceCard/>
      {/* <Leadership/> */}
    </>
  );
}

export default Home;
