import { useState } from 'react';

const Register = ({ openLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = { username, email, password };

        try {
            const response = await fetch('http://localhost:5100/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Usuario registrado:', result);
                openLogin(); // ✅ MOSTRAR LOGIN AL REGISTRARSE
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error al registrar:', error);
            setError('Hubo un error al registrar al usuario.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border"
                        placeholder="Ingresa tu nombre"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border"
                        placeholder="Ingresa el Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border"
                        placeholder="Ingresa la contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="mb-4">
                    <button type="submit" className="w-full bg-red-600 text-white py-2">
                        ¡Regístrate!
                    </button>
                </div>
            </form>
            <div className="text-center">
                <span className="text-gray-700">¿Ya tienes una cuenta? </span>
                <button className="text-red-800" onClick={openLogin}>
                    Inicia sesión
                </button>
            </div>
        </div>
    );
};

export default Register;
