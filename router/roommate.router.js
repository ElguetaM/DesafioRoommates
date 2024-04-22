import { Router } from "express";
import {
  index,
  getRoommatesC,
  postRoommateC,
  getGastosC,
  postGastosC,
  putGastosC,
  delGastosC,
} from "../controllers/roommates.controllers.js";

const router = Router();

router.get("/", index);

//Todos los Roommaetes//
router.get("/roommates", getRoommatesC);

//Nuevo Roommate//
router.post("/roommate", postRoommateC);

//Historial de gastos//
router.get("/gastos", getGastosC);

//Agregar gasto//
router.post("/gasto", postGastosC);

//Editar gastos//
router.put("/gasto", putGastosC);

// //Eliminar gastos//
router.delete("/gasto", delGastosC);

export default router;
