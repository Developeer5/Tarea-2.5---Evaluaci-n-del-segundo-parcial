import mongoose from 'mongoose'

const clienteSchema = new mongoose.Schema({
  apellidos: { type: String, required: true },
  nombres: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  sexo: { type: String, enum: ['masculino', 'femenino'], required: true },
  nota_grado: { type: Number, default: 0 },
  fecha_creacion: { type: Date, default: Date.now },
  // Campo agregado en el taller: identificador de negocio del cliente
  matricula: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  }
})

const Cliente = mongoose.model('Cliente', clienteSchema)
export default Cliente
