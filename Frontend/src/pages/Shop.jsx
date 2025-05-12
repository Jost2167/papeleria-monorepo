import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { setProducts } from "../redux/productSlice";
import axios from "axios";

const Shop = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product);

    useEffect(() => {
        // Obtener los productos desde el backend
        axios.get("http://localhost:5100/productos/")
            .then(res => {
                console.log("Datos recibidos:", res.data);
                dispatch(setProducts(res.data));
            })
            .catch(err => {
                console.error("Error al cargar productos:", err);
            });
    }, [dispatch]);
    
    return (
        <div className="container mx-auto py-12 px-4 md:px-16 lg:px-24">
            <h2 className="text-2x1 font-bold mb-6 text-center">Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
                {products.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Shop;
