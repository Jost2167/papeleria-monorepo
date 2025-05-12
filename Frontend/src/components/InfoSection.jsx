import { FaHeadset, FaLock, FaMoneyBillWave, FaShippingFast, FaTag } from "react-icons/fa";


const InfoSection = () => {

    const infoItems = [
        {
            icon: <FaShippingFast className="text-3xl text-red-600"/>,
            title: 'Domicilio gratis',
            description: 'Domicilios sin ningún costo adicional',
        },
        {
            icon: <FaHeadset className="text-3xl text-red-600"/>,
            title: 'Soporte 24/7',
            description: 'Estamos para asistirte en cualquier momento',
        },
        {
            icon: <FaMoneyBillWave className="text-3xl text-red-600"/>,
            title: 'Garantía',
            description: 'Rembolso o cambio de producto si no estás satisfecho',
        }, 
        {
            icon: <FaLock className="text-3xl text-red-600"/>,
            title: 'Pago seguro',
            description: 'Tu información de pago esta protegida con nosotros',
        },
        {
            icon: <FaTag className="text-3xl text-red-600"/>,
            title: 'Descuentos',
            description: 'Disfruta de los mejores precios',
        },
    ];

    return (
        <div className="bg-white pb-8 pt-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {infoItems.map((item,index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg shadow-md 
                transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                    {item.icon}
                    <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
                ))}
            </div>
        </div>


    );
};

export default InfoSection;
