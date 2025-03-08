import React from "react";
import alrajhibanklogo from "../images/bank/alrajhibanklogo.jpg";
import anbBankLogo from "../images/bank/anbBankLogo.jpg";
import BankAljazira from "../images/bank/BankAljazira.png";
import emiratesnbdlogok from "../images/bank/emiratesnbdlogok.png";
import riyadhbankpng from "../images/bank/riyadhbankpng.png";
import SNBLogo from "../images/bank/SNBLogo.jpg";

const reviews = [
  { name: "Al Rajhi Bank", username: "@dipak", body: "Exceptional MERN Stack expertise! Built a scalable full-stack application efficiently.", img: alrajhibanklogo },
  { name: "ANB Bank" , username: "@nilesh", body: "Highly skilled in React.js and Node.js! Delivered a seamless UI with robust backend integration.", img: anbBankLogo },
  { name: "Bank Al Jazira", username: "@janki", body: "The best MongoDB and Express.js implementation I've seen. Optimized queries for better performance.", img: BankAljazira },
  { name: "Emirates NBD" , username: "@gopal", body: "Built a high-performing web app with React and Redux. Code quality was outstanding!", img: emiratesnbdlogok },
  { name: "Riyadh Bank" , username: "@Rohan", body: "A MERN stack pro! Developed an efficient and scalable solution with top-notch security.", img: riyadhbankpng },
  { name: "SNB Bank" , username: "@hitesh", body: "Mastered full-stack development! Delivered a feature-rich, high-speed web app.", img: SNBLogo },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const Skils = () => {
  return (
    <div>
      <div className="marquee-container">
        <h1 className="Innovators">Banks & Financing Companies</h1>
        <div className="marquee">
          {firstRow.map((review) => (
            <figure key={review.username} className="review-card">
              <div className="user-info">
                <img className="user-image" src={review.img} alt={review.name} style={{ width: "100px", height: "100px" }} />
                <div>
                  <figcaption className="user-name">{review.name}</figcaption>
                  <p className="user-username">{review.username}</p>
                </div>
              </div>
              {/* <blockquote className="review-text">{review.body}</blockquote> */}
            </figure>
          ))}
        </div>
        <div className="marquee reverse">
          {secondRow.map((review) => (
            <figure key={review.username} className="review-card">
              <div className="user-info">
                <img className="user-image" src={review.img} alt={review.name} style={{ width: "100px", height: "100px" }} />
                <div>
                  <figcaption className="user-name">{review.name}</figcaption>
                  <p className="user-username">{review.username}</p>
                </div>
              </div>
              {/* <blockquote className="review-text">{review.body}</blockquote> */}
            </figure>
          ))}
        </div>
        <div className="gradient-left"></div>
        <div className="gradient-right"></div>
      </div>
      
      
    </div>
  );
};

export default Skils;