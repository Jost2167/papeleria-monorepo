/* eslint-disable react/prop-types */
import { useState } from 'react';

const Login = ({ openSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // ✅ mensaje de éxito

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5100/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // para enviar cookies si usas sesiones
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess('¡Inicio de sesión exitoso!'); // ✅ mensaje visible
                setError(null);

                setTimeout(() => {
                    window.location.reload(); // o cerrar modal aquí si prefieres
                }, 1500);
            } else {
                setError(result.message || 'Credenciales inválidas');
                setSuccess(null);
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError('Error de red o del servidor');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>

            {/* ✅ Mostrar mensaje de éxito */}
            {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
            {/* ❌ Mostrar errores */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleLogin}>
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
                        className="w-full px-3 py-2 border"
                        type="password"
                        placeholder="Ingresa la contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-red-600 text-white py-2">
                        Iniciar
                    </button>
                </div>
            </form>
            <div className="text-center">
                <span className="text-gray-700">¿No tienes una cuenta? </span>
                <button className="text-red-800" onClick={openSignUp}>
                    ¡Regístrate!
                </button>
            </div>
        </div>
    );
};

export default Login;
