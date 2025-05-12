import { useState } from "react";
import Slider from "react-slick";
import Norma from "../assets/Images/norma.png";
import Sharpie from "../assets/Images/sharpie.png";
import Cassio from "../assets/Images/casio.jpg";
import FaberCastell from "../assets/Images/fabercastell.svg";
import PaperMate from "../assets/Images/papermate.png";
import Bic from "../assets/Images/bic.jpeg";

const marcas = [
  { title: '', imageUrl: Norma },
  { title: '', imageUrl: Sharpie },
  { title: '', imageUrl: Cassio },
  { title: '', imageUrl: FaberCastell },
  { title: '', imageUrl: PaperMate },
  { title: '', imageUrl: Bic },
  // Puedes agregar más imágenes aquí
];

const CategorySection = () => {
  const [marcasList] = useState(marcas);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Número de elementos visibles
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto">
      <Slider {...settings}>
        {marcasList.map((marca, index) => (
          <div key={index} className="relative h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
            <img
              src={marca.imageUrl}
              alt={`Marca ${index}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-20 left-12">
              <p className="text-xl font-bold">{marca.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySection;
