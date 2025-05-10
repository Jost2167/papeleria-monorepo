import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'], 
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [30, 'El nombre no debe exceder 100 caracteres']
  },
  descripcion: { 
    type: String, 
    trim: true,
    maxlength: [250, 'La descripción no debe exceder 500 caracteres']
  },
  precio: { 
    type: Number, 
    required: [true, 'El precio es obligatorio'], 
    min: [0, 'El precio no puede ser negativo']
  },
  stock: { 
    type: Number, 
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  imagenUrl: { 
    type: String, 
    trim: true,
  },
  categoria: { 
    type: String,
    trim: true,
    minlength: [3, 'La categoría debe tener al menos 3 caracteres'],
    maxlength: [50, 'La categoría no debe exceder 50 caracteres']
  }
}, {
  timestamps: true,
});

export default mongoose.model('productos', productoSchema);
