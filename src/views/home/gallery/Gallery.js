import React from "react";
import { Assets } from "@src/assets/images"; // Assuming you save the CSS in Gallery.css
import "./Gallery.css";

const Gallery = () => {
  return (
    <div className="row">
      <div className="column">
        <img src={Assets.restaurant_img1} />
        <img src={Assets.delivery_takeout} />
        <img src={Assets.coffee_shop} />
      </div>
      <div className="column">
      <img src={Assets.dining_area} />
        <img src={Assets.food_plate} />
        <img src={Assets.restaurant_img2} />

      </div>
      <div className="column">
      <img src={Assets.open_kitchen} />
        <img src={Assets.restaurant_img3} />
        <img src={Assets.bar_area} />
      </div>
      <div className="column">
      <img src={Assets.restrooms}  />
        <img src={Assets.restaurant_img4}  />
        <img src={Assets.parking_facilities}  />

      </div>
    </div>);
};

export default Gallery;
