import React from "react";
import "./homePage.css";
import img1 from "../../images/img-1.jpg";
import img2 from "../../images/img-2.jpg";
import img3 from "../../images/img-3.jpg";
import img4 from "../../images/img-4.jpg";
import img6 from "../../images/img-6.jpg";
import img7 from "../../images/img-7.jpg";
import img5 from "../../images/img-5.jpg";

import { NavLink } from "react-router-dom";
import Navbar from "../../navbar/Navbar";

const displayImg = [img1, img2, img3, img4, img5, img6, img7];

const HomePage = () => {

  return (
    <div className="homPage">
        <Navbar/>
      <div className="mainSection">
        <div className="cards">
          {displayImg.map((img, index) => {
            return <img src={img} key={index + 1} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
