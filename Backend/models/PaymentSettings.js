import mongoose from "mongoose";

const bankTransferDetailsSchema = new mongoose.Schema({
  bankName: String,
  accountType: String,
  accountNumber: String,
  swiftCode: String,
  accountHolderName: String,
  accountHolderNIT: String,
}, { _id: false });

const paymentSettingsSchema = new mongoose.Schema({
  codEnabled: { type: Boolean, default: false },           // Pago contraentrega
  debitEnabled: { type: Boolean, default: false },         // Tarjeta débito
  bankTransferEnabled: { type: Boolean, default: false },  // Transferencia
  bankTransferDetails: { type: bankTransferDetailsSchema, default: {} },
}, {
  timestamps: true,
});

const PaymentSettings = mongoose.model("PaymentSettings", paymentSettingsSchema);
export default PaymentSettings;
