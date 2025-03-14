import React from "react";
import alrajhibanklogo from "../images/bank/alrajhibanklogo.jpg";
import anbBankLogo from "../images/bank/anbBankLogo.jpg";
import BankAljazira from "../images/bank/BankAljazira.png";
import emiratesnbdlogok from "../images/bank/emiratesnbdlogok.png";
import riyadhbankpng from "../images/bank/riyadhbankpng.png";
import SNBLogo from "../images/bank/SNBLogo.jpg";
import Alinma from "../images/bank/Alinma.jpg";
import Albilad from "../images/bank/ALBILAD.png";
import Saudi from "../images/bank/SAUDI FRANSI.png";
import SIB from "../images/bank/SIB.png";
import Aljabr from "../images/bank/ALJABR.jpg";
import Tawkelat from "../images/bank/TAWKELAT.jpg";
import Tamweel from "../images/bank/TAMWEEL ALOULA.png";
import Yanal from "../images/bank/YANAL.jpg";
import Bidaya from "../images/bank/BIDAYA.png";
import Aljuf from "../images/bank/ALJUF.png";
import Raya from "../images/bank/RAYA.jpg";
import Emkan from "../images/bank/EMKAN.png";
import Ijarah from "../images/bank/IJARAH.jpg";
import Taajeer from "../images/bank/TAAJEER.jpg";

const reviews = [
  { name: "SNB", username: "@SNB", body: "", img: SNBLogo },
  { name: "ARB", username: "@ARB", body: "", img: alrajhibanklogo },
  { name: "Riyad Bank", username: "@Riyadh", body: "", img: riyadhbankpng },
  { name: "ANB", username: "@ANB", body: "", img: anbBankLogo },
  { name: "Alinma", username: "@Alinma", body: "", img: Alinma },
  { name: "Albilad", username: "@Albilad", body: "", img: Albilad },
  { name: "Saudi Fransi", username: "@Fransi", body: "", img: Saudi },
  { name: "Emirates NBD", username: "@Emirates", body: "", img: emiratesnbdlogok },
  { name: "Aljazira", username: "@Jazira", body: "", img: BankAljazira },
  { name: "SIB", username: "@SIB", body: "", img:SIB },
  { name: "Aljabr", username: "@Aljabr", body: "", img: Aljabr },
  { name: "Tawkelat", username: "@Tawkelat", body: "", img:Tawkelat  },
  { name: "Tamweel Aloula", username: "@Tamweel", body: "", img: Tamweel },
  { name: "Yanal", username: "@Yanal", body: "", img: Yanal },
  { name: "Bidaya", username: "@Bidaya", body: "", img: Bidaya },
  { name: "Aljuf", username: "@Aljuf", body: "", img: Aljuf },
  { name: "Raya", username: "@Raya", body: "", img: Raya },
  { name: "Emkan", username: "@Emkan", body: "", img: Emkan },
  { name: "Ijarah", username: "@Ijarah", body: "", img: Ijarah},
  { name: "Taajeer", username: "@Taajeer", body: "", img: Taajeer },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const Banks = () => {
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

export default Banks;