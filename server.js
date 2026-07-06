import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import clienteRoutes from './routes/clienteRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express(); // Asignación correcta
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido a la API CLIENTES" });
});

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo por el puerto ${PORT}`); // Backticks para template literals
});