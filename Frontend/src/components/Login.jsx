/* eslint-disable react/prop-types */
const Login = ({openSignUp}) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" className="w-full px-3 py-2 border" placeholder="Ingresa el Email"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contraseña</label>
                    <input className="w-full px-3 py-2 border" type="password" placeholder="Ingresa la contraseña"/>
                </div>
                <div className="mb-4 flex items-center justify-between">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox"/>
                        <span className="ml-2 text-gray-700">Recordar constraseña</span>
                    </label>
                        <a href="#" className="text-red-800">¿Olvidaste la contraseña?</a>
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-red-600 text-white py-2">Iniciar</button>
                </div>
            </form>
            <div className="text-center">
                <span className="text-gray-700">¿No tienes una cuenta? </span>
                <button className="text-red-800" onClick={openSignUp}> Registrate!</button> 
            </div>
        </div>  
    )
}

export default Login