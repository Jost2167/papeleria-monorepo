import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 px-4 md:px-16 lg:px-24">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-semibold">Papeleria</h3>
                    <p className="mt-4">
                    Usco Papelería - Todo lo que necesitas para estudiar, trabajar y crear. Calidad, variedad y servicio al alcance de tu mano. ¡Visítanos hoy!
                    </p>
                </div>
                <div className="flex flex-col md:items-center">
                    <h4 className="text-lg font-semibold">Links</h4>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <Link to="/" className="hover:underline">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/shop" className="hover:underline">Tienda</Link>
                        </li>
                        <li>
                            <Link to="/Contact" className="hover:underline">Contacto</Link>
                        </li>
                        <li>
                            <Link to="/aboutus" className="hover:underline">Sobre nosotros</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Síguenos</h4>
                    <div className="flex space-x-4 mt-4">
                        <a href="" className="hover:text-gray-400"><FaFacebook /></a>
                        <a href="" className="hover:text-gray-400"><FaTwitter /></a>
                        <a href="" className="hover:text-gray-400"><FaGithub /></a>
                        <a href="" className="hover:text-gray-400"><FaLinkedin /></a>
                    </div>
                    <form className="flex items-center justify-center mt-8">
                        <input type="email" placeholder="Ingresa tu correo" 
                        className="w-full p-2 rounded-l-lg bg-gray-800 border border-gray-600" />
                        <button className="bg-red-600 text-white px-4 py-2 rounded-r-lg">Suscribirse</button>
                    </form>
                </div>
            </div>

                        {/* Métodos de pago con fondo claro */}
                        <div className="mt-8 bg-gray-100 py-4 rounded-lg">
                <h4 className="text-lg font-semibold text-center text-gray-800">Métodos de pago</h4>
                <ul className="flex flex-wrap justify-center gap-6 mt-4">
                    <li>
                        <img src="https://panamericana.vtexassets.com/arquivos/logo-pse-16.svg" alt="PSE" className="w-28" />
                    </li>
                    <li>
                        <img src="https://panamericana.vtexassets.com/assets/vtex.file-manager-graphql/images/8821a405-2c79-442b-8b48-f96b02727e32___0009479117fd752221cbbf203b7ab1ad.svg" alt="Logo 2" className="w-28" />
                    </li>
                    <li>
                        <img src="https://panamericana.vtexassets.com/arquivos/logo-master-13.svg" alt="MasterCard" className="w-28" />
                    </li>
                    <li>
                        <img src="https://panamericana.vtexassets.com/arquivos/logo-visa-14.svg" alt="Visa" className="w-28" />
                    </li>
                    <li>
                        <img src="https://panamericana.vtexassets.com/arquivos/logo-diners-15.svg" alt="Diners" className="w-28" />
                    </li>
                    <li>
                        <img src="https://panamericana.vtexassets.com/arquivos/logo-american-17.svg" alt="American Express" className="w-28" />
                    </li>
                    <li>
                        <img src="https://panamericana.vtexassets.com/arquivos/logo-nequi-18.svg" alt="Nequi" className="w-28" />
                    </li>
                    <li>
                        <img src="https://panamericana.vtexassets.com/arquivos/logo-mercado-pagp-2023-12.svg" alt="Mercado Pago" className="w-28" />
                    </li>
                </ul>
            </div>


            <div className="mt-8 border-t border-gray-700 pt-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; 2024 Papeleria Derechos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="" className="hover:underline">Politica de privacidad</a>
                        <a href="" className="hover:underline">Terminos y condiciones</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
