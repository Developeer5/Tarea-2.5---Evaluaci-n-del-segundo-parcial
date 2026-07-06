import Cliente from '../models/Cliente.js'

// Obtener todos los clientes
// (el campo matricula viaja automaticamente porque forma parte del esquema)
export const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find()
    res.json(clientes)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes' })
  }
}

// Crear nuevo cliente
// El body ahora debe incluir tambien "matricula" (String), por ejemplo:
// { "nombres": "Juan", "apellidos": "Perez", "fechaNacimiento": "2000-05-10",
//   "sexo": "masculino", "nota_grado": 8.5, "matricula": "M-2026-001" }
export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body)
    const clienteGuardado = await nuevoCliente.save()
    res.status(201).json(clienteGuardado)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un cliente con esa matricula' })
    }
    res.status(400).json({ mensaje: 'Error al crear cliente' })
  }
}

// Obtener un cliente por matricula (endpoint de apoyo para probar PUT y DELETE)
export const obtenerClientePorMatricula = async (req, res) => {
  try {
    const { matricula } = req.params
    const cliente = await Cliente.findOne({ matricula: matricula.toUpperCase() })
    if (!cliente) {
      return res.status(404).json({ mensaje: `No existe un cliente con la matricula ${matricula}` })
    }
    res.json(cliente)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el cliente' })
  }
}

// Actualizar un cliente identificandolo por su numero de MATRICULA (PUT)
export const actualizarClientePorMatricula = async (req, res) => {
  try {
    const { matricula } = req.params
    const clienteActualizado = await Cliente.findOneAndUpdate(
      { matricula: matricula.toUpperCase() },
      req.body,
      { new: true, runValidators: true }
    )

    if (!clienteActualizado) {
      return res.status(404).json({ mensaje: `No existe un cliente con la matricula ${matricula}` })
    }

    res.json({
      mensaje: 'Cliente actualizado correctamente',
      cliente: clienteActualizado
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un cliente con esa matricula' })
    }
    res.status(400).json({ mensaje: 'Error al actualizar el cliente' })
  }
}

// Eliminar un cliente identificandolo por su numero de MATRICULA (DELETE)
export const eliminarClientePorMatricula = async (req, res) => {
  try {
    const { matricula } = req.params
    const clienteEliminado = await Cliente.findOneAndDelete({
      matricula: matricula.toUpperCase()
    })

    if (!clienteEliminado) {
      return res.status(404).json({ mensaje: `No existe un cliente con la matricula ${matricula}` })
    }

    res.json({
      mensaje: 'Cliente eliminado correctamente',
      cliente: clienteEliminado
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el cliente' })
  }
}
