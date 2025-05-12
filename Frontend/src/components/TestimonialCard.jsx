/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// src/components/TestimonialCard.jsx

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 mb-4">"{testimonial.text}"</p>
            <p className="text-sm text-gray-500">- {testimonial.name}</p>
        </div>
    );
};

export default TestimonialCard;
