import { Link } from "react-router-dom"

const AboutUs = () => {
  return (
    <div>
        <div className="h-[70vh] flex flex-col-reverse md:flex-row items-center gap-5 md:px-32 px-5 bg-cover bg-center" style={{backgroundImage:"url(/src/assets/Images/bgabout1.jpg)"}}>
            <div className="w-full md:w-2/4 flex items-center justify-center">
                <img src="../src/assets/Images/aboutus.jpg" style={{width:"75%", borderRadius:"10px"}}/>
            </div>
            <div className="w-full md:w-2/4 text-center space-y-2">
                <div>
                    <h3 className="text-5xl font-semibold text-gray-800">¿Quienes </h3>
                    <span className="text-gray-700 text-xl">Somos?</span>
                </div>
                <p>
                Desde 2024, Usco Papelería ha sido un referente en la venta de artículos de papelería. Nuestra pasión por la escritura y el aprendizaje nos impulsa a ofrecer productos innovadores y un servicio excepcional. En Usco Papelería, encontrarás una amplia variedad de productos de las mejores marcas, desde cuadernos y bolígrafos hasta materiales de oficina y artículos de regalo. La calidad es nuestra máxima prioridad, y seleccionamos cuidadosamente cada producto que ofrecemos.
                </p>
                <Link to="/Contact">
                    <button className="bg-white py-2 px-5 rounded-full mt-4 outline hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-gray-800 hover:text-white transition-all">Contactanos</button>
                </Link>
            </div>
        </div>

        <div className="h-[70vh] flex flex-col-reverse md:flex-row items-center gap-5 md:px-32 px-5 bg-cover bg-center" style={{backgroundImage:"url(/src/assets/Images/bgabout2.jpg)"}}>
            <div className="w-full md:w-2/4 text-center space-y-2">
                <div>
                    <h3 className="text-5xl font-semibold text-gray-800">¿Que Puedes Encontrar</h3>
                    <span className="text-gray-700 text-xl">Con Nosotros?</span>
                </div>
                <p>
                ¡Libera tu creatividad con nuestra amplia variedad de productos de papelería! Desde colores vibrantes de las mejores marcas hasta papeles de diseño exclusivos, tenemos todo para tus proyectos. ¡Calidad y variedad en un solo lugar!
                </p>
                <Link to="/shop">
                    <button className="bg-white py-2 px-5 rounded-full mt-4 outline hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-gray-800 hover:text-white transition-all">Nuestros Productos</button>
                </Link>
            </div>
            <div className="w-full md:w-2/4 flex items-center justify-center">
                <img src="../src/assets/Images/aboutus1.jpg" style={{width:"75%", borderRadius:"10px"}}/>
            </div>
        </div> 
    </div>
  )
}

export default AboutUs