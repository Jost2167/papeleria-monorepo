import { useEffect, useState } from "react";
import Slider from "react-slick";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [books, setBooks] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=react"
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBooks();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "..."; // Truncar texto con puntos suspensivos
    }
    return text;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Mostrar hasta 4 elementos
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 overflow-x-hidden">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12 tracking-wide">
        <span className="text-blue-700">LibreriaAPI</span> Collection
      </h1>

      {/* Sección de productos */}
      <section>
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
          Productos
        </h2>
        <Slider {...settings}>
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow overflow-hidden group"
            >
              <figure className="bg-gray-200 p-4 group-hover:opacity-75 transition-opacity">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain max-w-full transition-all"
                />
              </figure>
              <div className="p-4 text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors">
                  {truncateText(product.title, 30)} {/* Truncar el título */}
                </h3>
                <p className="text-gray-900 font-bold text-lg">
                  ${product.price}
                </p>
                <p className="text-gray-600 text-sm">
                  {truncateText(product.description, 60)} {/* Truncar la descripción */}
                </p>
                <button className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Sección de libros */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
          Libros
        </h2>
        <Slider {...settings}>
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow overflow-hidden group"
            >
              <figure className="bg-gray-200 p-4 group-hover:opacity-75 transition-opacity">
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="w-full h-48 object-contain max-w-full transition-all"
                  />
                )}
              </figure>
              <div className="p-4 text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors">
                  {truncateText(book.volumeInfo.title, 30)} {/* Truncar el título */}
                </h3>
                <p className="text-gray-500">
                  {book.volumeInfo.authors?.join(", ")}
                </p>
                <p className="text-gray-900 font-bold text-lg">
                  ${book.saleInfo?.listPrice?.amount || "N/A"}
                </p>
                <button className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};
