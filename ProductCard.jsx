import React from "react";
import "./ProductCard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function ProductCard({ name, price, website, imgSrc, rating, reviews }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };



  
  return (
    <div className="card">
      <img src={imgSrc}  className="w-full h-56" />
      <div style={{ height: "110px" }}>
        <h1 className="price name">{name}</h1>
      </div>
      <div className="flex tt ">
        <p className="ra">{rating}</p>
        <div className="rating-star">{renderStars()}</div>

        <div className="ra">
          <p>({reviews})</p>
        </div>
      </div>
      <p className="price">{price}</p>
      <p className="tt">{website}</p>
      <p>
        <button>Buy Now</button>
      </p>
    </div>
  );
}

export default ProductCard;
