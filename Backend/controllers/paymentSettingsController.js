import PaymentSettings from "../models/PaymentSettings.js";

// Obtener la configuración actual
export const getPaymentSettings = async (req, res) => {
  try {
    const settings = await PaymentSettings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener configuración de pagos" });
  }
};

// Actualizar configuración
export const updatePaymentSettings = async (req, res) => {
  try {
    const {
      codEnabled,
      debitEnabled,
      bankTransferEnabled,
      bankTransferDetails
    } = req.body;

    let settings = await PaymentSettings.findOne();

    if (!settings) {
      settings = new PaymentSettings();
    }

    if (typeof codEnabled === "boolean")       settings.codEnabled = codEnabled;
    if (typeof debitEnabled === "boolean")     settings.debitEnabled = debitEnabled;
    if (typeof bankTransferEnabled === "boolean") settings.bankTransferEnabled = bankTransferEnabled;

    if (bankTransferDetails && typeof bankTransferDetails === "object") {
      settings.bankTransferDetails = {
        ...settings.bankTransferDetails.toObject(),
        ...bankTransferDetails
      };
    }

    await settings.save();
    res.json({ message: "Configuración actualizada", settings });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar configuración de pagos" });
  }
};
