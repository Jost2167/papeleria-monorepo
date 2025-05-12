// src/components/TestimonialsSection.jsx

import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
    const testimonials = [
        {
            text: "¡Excelente servicio! La tienda tiene una gran variedad de productos y los precios son muy buenos. La atención al cliente es increíble.",
            name: "Ana María, cliente satisfecha"
        },
        {
            text: "He comprado varias veces en esta tienda, y siempre me sorprenden con sus ofertas y tiempos de entrega rápidos. ¡Muy recomendados!",
            name: "Carlos Gómez, cliente recurrente"
        },
        {
            text: "Me encantan los productos que ofrecen, de excelente calidad. Además, el proceso de compra es muy fácil y seguro.",
            name: "Laura Pérez, cliente feliz"
        }
    ];

    return (
        <div className="bg-gray-100 py-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Opiniones de nuestros clientes</h2>
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};

export default TestimonialsSection;
