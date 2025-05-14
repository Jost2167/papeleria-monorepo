import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { email, password, username, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado." });
    }

    // Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Si no se especifica un rol, asignar 'user' por defecto
    const userRole = role || "user"; // Asignar 'user' por defecto si no se envió el campo 'role'

    // Crear un nuevo usuario con el rol especificado (o por defecto 'user')
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role: userRole, // Asignar el rol (admin, user, etc.)
    });

    const userSaved = await newUser.save();

    // Generar un token para el usuario
    const token = await createAccessToken({ id: userSaved._id });

    // Responder con el token y los datos del usuario
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role, // También devolver el rol
      createAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role, // También devolver el rol
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  });
};
