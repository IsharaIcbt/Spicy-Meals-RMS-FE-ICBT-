import React from 'react';
import { Assets } from "@src/assets/images"; // Assuming you save the CSS in Gallery.css
import './Gallery.scss';

// Sample images (replace these with your actual image paths)
const images = [
  { src: Assets.dining_area, alt: 'Image 1', className: 'item1' },
  { src: Assets.delivery_takeout, alt: 'Image 2', className: 'item2' },
  { src: Assets.wifi_internet, alt: 'Image 3', className: 'item3' },
  { src: Assets.open_kitchen, alt: 'Image 4', className: 'item4' },
  { src: Assets.restrooms, alt: 'Image 5', className: 'item5' },
  { src: Assets.bar_area, alt: 'Image 6', className: 'item6' },
];

const Gallery = () => {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-card">
          <img src={image.src} alt={image.alt} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
