import { useEffect, useState } from "react";
import { FaCarSide, FaQuestion } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import Swal from 'sweetalert2'; // Importar SweetAlert2

const ProductDetail = () => {
    const { id } = useParams();
    const products = useSelector(state => state.product.products);
    const [product, setProduct] = useState();

    const dispatch = useDispatch();

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(addToCart(product));

        // Mostrar alerta bonita usando SweetAlert2
        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado!',
            text: `Has agregado ${product.name} al carrito.`,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
            background: '#f0f8ff',
            iconColor: '#1e90ff',
            customClass: {
                title: 'font-bold text-lg',
                content: 'text-base',
            },
        });
    };

    useEffect(() => {
        const newProduct = products.find(
            (product) => product.id === parseInt(id)
        );
        setProduct(newProduct);
    }, [id, products]);

    if (!product) return <div>Cargando ...</div>;

    return(
        <div className="h-[90vh] container mx-auto py-8 px-4 md:px-16 lg:px-24">
            <div className="flex flex-col md:flex-row gap-x-16">
                <div className="md:w-1/2 py-4 shadow-md md:px-8 h-96 flex justify-center">
                    <img src={product.image} alt={product.name} className="h-full" />
                </div>

                <div className="md:w-1/2 p-4 shadow-md md:p-16 flex flex-col items-center gap-y-2">
                    <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-xl font-semibold text-gray-800 mb-4">
                        ${product.price}
                    </p>

                    <div className="flex items-center mb-4 gap-x-2">
                        <button
                            className="bg-red-600 text-white py-1.5 px-4 hover:bg-red-800"
                            onClick={(e) => handleAddToCart(e, product)}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                    <div className="flex flex-col gap-y-4 mt-4">
                        <p className="flex items-center">
                            <FaCarSide className="mr-1" />
                            Domicilios y Reembolsos
                        </p>
                        <p className="flex items-center">
                            <FaQuestion className="mr-1" />
                            Haz una pregunta
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">Descripción del producto</h3>
                <p>{product.description}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
