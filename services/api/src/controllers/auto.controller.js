import { AutoService } from "../services/auto.service.js";
import { logAction } from "../utils/logAction.js";

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

  const {
      marca,
      modelo,
      tipoVehiculo,
      anio,
      precioPorDia,
      descripcion,
      transmision,
      combustible,
      estado,
  } = req.body;


  const auto = await AutoService.create({
      marca: marca,
      modelo: modelo,
      tipoVehiculo: tipoVehiculo,
      anio: Number(anio),
      precioPorDia: Number(precioPorDia),
      descripcion: descripcion,
      transmision: transmision,
      combustible: combustible,
      estado: estado,
  });

  await logAction( {
    req,
    accion: "auto:create",
    descripcion: `Auto creado: ${auto.marca} ${auto.modelo}`,
  })

  res.status(201).json(auto);
};

export const updateAuto = async (req, res) => {
  const auto = await AutoService.update(+req.params.id, req.body);

  await logAction({
    req,
    accion: "UPDATE_AUTO",
    descripcion: `Auto actualizado ID ${auto.id}`,
  })

  res.json(auto)
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
