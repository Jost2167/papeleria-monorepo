/* eslint-disable react/prop-types */
const Register = ({openLogin}) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre</label>
                    <input type="text" className="w-full px-3 py-2 border" placeholder="Ingresa tu nombre"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" className="w-full px-3 py-2 border" placeholder="Ingresa el Email"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contraseña</label>
                    <input className="w-full px-3 py-2 border" type="password" placeholder="Ingresa la contraseña"/>
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-red-600 text-white py-2">Registrate!</button>
                </div>
            </form>
            <div className="text-center">
                <span className="text-gray-700">¿Tienes una cuenta? </span>
                <button className="text-red-800" onClick={openLogin}>Login</button> 
            </div>
        </div>  
    )
}

export default Register