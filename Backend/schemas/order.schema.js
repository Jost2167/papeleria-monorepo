import { z } from "zod";

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().url(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive()
});

const ShippingInformationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  zip: z.string()
});

export const createOrderSchema = z.object({
  products: z.array(ProductSchema).min(1, { message: "Debe haber al menos un producto" }),
  shippingInformation: ShippingInformationSchema,
  totalPrice: z.number().nonnegative(),
  paymentMethod: z.enum(["cod", "dc", "bank"]),
  bankProof: z.string().url().optional()
});

export const updateStatusSchema = z.object({
  status: z.enum(["pendiente", "enviado", "entregado"])
});
