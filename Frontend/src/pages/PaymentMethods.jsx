import { useState, useEffect } from "react";
import axios from "axios";

const PaymentMethods = () => {
  // Estado para los métodos de pago
  const [codEnabled, setCodEnabled] = useState(false);
  const [debitEnabled, setDebitEnabled] = useState(false);
  const [bankTransferEnabled, setBankTransferEnabled] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountHolderNIT, setAccountHolderNIT] = useState("");

  const [loading, setLoading] = useState(true);

  // Cargar la configuración desde la base de datos
  useEffect(() => {
    const fetchPaymentSettings = async () => {
      try {
        const response = await axios.get("http://localhost:5100/api/payment");
        const settings = response.data;

        // Configurar los valores desde la base de datos
        setCodEnabled(settings.codEnabled);
        setDebitEnabled(settings.debitEnabled);
        setBankTransferEnabled(settings.bankTransferEnabled);

        if (settings.bankTransferEnabled) {
          setBankName(settings.bankTransferDetails.bankName);
          setAccountType(settings.bankTransferDetails.accountType);
          setAccountNumber(settings.bankTransferDetails.accountNumber);
          setSwiftCode(settings.bankTransferDetails.swiftCode);
          setAccountHolderName(settings.bankTransferDetails.accountHolderName);
          setAccountHolderNIT(settings.bankTransferDetails.accountHolderNIT);
        }
      } catch (error) {
        console.error("Error al obtener los datos de configuración de pagos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentSettings();
  }, []);

  const handleSave = async () => {
    const updatedSettings = {
      codEnabled,
      debitEnabled,
      bankTransferEnabled,
      bankTransferDetails: {
        bankName,
        accountType,
        accountNumber,
        swiftCode,
        accountHolderName,
        accountHolderNIT,
      },
    };

    try {
      await axios.put("http://localhost:5100/api/payment", updatedSettings);
      alert("Configuración guardada correctamente.");
    } catch (error) {
      console.error("Error al guardar los datos", error);
      alert("Hubo un error al guardar los datos.");
    }
  };

  if (loading) return <div className="text-center text-xl font-semibold">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestionar Métodos de Pago</h1>

      {/* Método de pago Contraentrega */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={codEnabled}
            onChange={(e) => setCodEnabled(e.target.checked)}
            className="mr-2"
          />
          <label className="text-lg font-medium">Pago Contraentrega</label>
        </div>
        <span
          className={`text-sm font-medium ${codEnabled ? 'text-green-500' : 'text-red-500'}`}
        >
          {codEnabled ? "Habilitado" : "Deshabilitado"}
        </span>
      </div>

      {/* Método de pago Tarjeta Débito */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={debitEnabled}
            onChange={(e) => setDebitEnabled(e.target.checked)}
            className="mr-2"
          />
          <label className="text-lg font-medium">Tarjeta Débito</label>
        </div>
        <span
          className={`text-sm font-medium ${debitEnabled ? 'text-green-500' : 'text-red-500'}`}
        >
          {debitEnabled ? "Habilitado" : "Deshabilitado"}
        </span>
      </div>

      {/* Método de pago Transferencia */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={bankTransferEnabled}
            onChange={(e) => setBankTransferEnabled(e.target.checked)}
            className="mr-2"
          />
          <label className="text-lg font-medium">Transferencia Bancaria</label>
        </div>
        <span
          className={`text-sm font-medium ${bankTransferEnabled ? 'text-green-500' : 'text-red-500'}`}
        >
          {bankTransferEnabled ? "Habilitado" : "Deshabilitado"}
        </span>
      </div>

      {/* Solo mostrar los campos de transferencia si está habilitada */}
      {bankTransferEnabled && (
        <>
          <h3 className="text-xl font-semibold mb-6 text-center">Datos de Transferencia</h3>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <strong>Banco:</strong>
                <p>{bankName}</p>
              </div>
              <div>
                <strong>Tipo de cuenta:</strong>
                <p>{accountType}</p>
              </div>
              <div>
                <strong>Número de cuenta:</strong>
                <p>{accountNumber}</p>
              </div>
              <div>
                <strong>Código SWIFT:</strong>
                <p>{swiftCode}</p>
              </div>
              <div>
                <strong>Nombre del titular:</strong>
                <p>{accountHolderName}</p>
              </div>
              <div>
                <strong>NIT del titular:</strong>
                <p>{accountHolderNIT}</p>
              </div>
            </div>
          </div>

          {/* Formulario para actualizar los datos de transferencia */}
          <h3 className="text-xl font-semibold mb-4">Editar Información</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-medium">Banco</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium">Tipo de Cuenta</label>
                <input
                  type="text"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium">Número de Cuenta</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium">Código SWIFT</label>
                <input
                  type="text"
                  value={swiftCode}
                  onChange={(e) => setSwiftCode(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium">Nombre del Titular</label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium">NIT del Titular</label>
                <input
                  type="text"
                  value={accountHolderNIT}
                  onChange={(e) => setAccountHolderNIT(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </form>
        </>
      )}

      <div className="mt-6">
        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
