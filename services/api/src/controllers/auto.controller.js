import path from "path";
import { AutoService } from "../services/auto.service.js";
import { logAction } from "../utils/logAction.js";
import fs from "fs"

export const getAutos = async (_, res) => {
  res.json(await AutoService.getAll());
};

export const getAuto = async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({
      message: "ID invalido o no proporcionado"
    });
  }
 
  const auto = await AutoService.getById(id);
  
  if (!auto) {
    return res.status(404).json({ message: "Auto no encontrado" });
  }
  
  res.json(auto);
};

export const createAuto = async (req, res) => {
  try {  

    const {
      marca,
      modelo,
      tipoVehiculo,
      anio,
      precioPorDia,
      descripcion,
      transmision,
      combustible,
      capacidad,
      cantidadpuerta,
      kilometraje,
      estado,
    } = req.body

    const auto = await AutoService.create({
      marca,
      modelo,
      tipoVehiculo,
      anio: Number(anio),
      precioPorDia: Number(precioPorDia),
      descripcion,
      transmision,
      combustible,
      capacidad: Number(capacidad),
      cantidadpuerta: Number(cantidadpuerta),
      kilometraje,
      estado,
      imagen: `/uploads/autos/${req.file.filename}`,
    })

    await logAction({
      req,
      accion: "auto:create",
      descripcion: `Auto creado: ${auto.marca} ${auto.modelo}`,
    })

    return res.status(201).json(auto)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error al crear auto' })
  }
}


export const updateAuto = async (req, res) => {
  const id = Number(req.params.id)

  const autoActual = await AutoService.getById(id)

  if (!autoActual) {
    return res.status(404).json({ message: "Auto no encontrado "})
  }

  let nuevaImagen = autoActual.imagen

  if (req.file) {
    if (autoActual.imagen) {
      const rutaAnterior = path.resolve(
        "uploads",
        autoActual.imagen.replace("api/uploads/", "")
      )

      if (fs.existsSync(rutaAnterior)) {
        fs.unlinkSync(rutaAnterior)
      }
    }

    nuevaImagen = `/uploads/autos/${req.file.filename}`
  }

  const autoActualizado = await AutoService.update(id, {
    marca: req.body.marca,
    modelo: req.body.modelo,
    tipoVehiculo: req.body.tipoVehiculo,
    anio: Number(req.body.anio),
    precioPorDia: Number(req.body.precioPorDia),
    descripcion: req.body.descripcion,
    transmision: req.body.transmision,
    combustible: req.body.combustible,
    capacidad: Number(req.body.capacidad),
    cantidadpuerta: Number(req.body.cantidadpuerta),
    kilometraje: req.body.kilometraje,
    estado: req.body.estado,
    imagen: nuevaImagen,
  })

  await logAction({
    req,
    accion: "auto:update",
    descripcion: `Auto actualizado: ${autoActualizado.marca} ${autoActualizado.modelo}`,
  })

  res.json(autoActualizado)
};

export const deleteAuto = async (req, res) => {
  await AutoService.delete(+req.params.id);

  await logAction({
    req,
    accion: "DELETE_AUTO",
    descripcion: `Auto eliminado ID ${req.params.id}`,
  });

  res.json({ message: "Auto eliminado" });
};
