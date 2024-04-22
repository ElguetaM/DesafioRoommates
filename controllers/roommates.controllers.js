import {
  getRoommatesQ,
  postRoommateQ,
  getGastosQ,
  postGastosQ,
  putGastosQ,
  delGastosQ,
} from "../query/roommates.query.js";
import path from "path";

const __dirname = import.meta.dirname;

//Get Index//

const index = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

//Get Roommates//
const getRoommatesC = async (req, res) => {
  try {
    const roommates = await getRoommatesQ();
    res.json(roommates);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Post Roommate//
const postRoommateC = async (req, res) => {
  try {
    await postRoommateQ();
    res.redirect("/roommates");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Get gastos//
const getGastosC = async (req, res) => {
  try {
    const gastos = await getGastosQ();
    res.json(gastos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const postGastosC = async (req, res) => {
  try {
    const { roommate, descripcion, monto } = req.body;
    const newGastos = [roommate, descripcion, monto];
    const gasto = await postGastosQ(newGastos);
    res.status(200).send(gasto);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Put gastos//
const putGastosC = async (req, res) => {
  try {
    const { id } = req.query;
    const { roommate, descripcion, monto } = req.body;
    const newGasto = [roommate, descripcion, monto, id];
    const newDatos = await putGastosQ(newGasto);
    res.status(200).send(newDatos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Delete gastos//
const delGastosC = async (req, res) => {
  try {
    const { id } = req.query;
    const gastos = await delGastosQ(id);
    res.status(200).send(gastos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export {
  index,
  getRoommatesC,
  postRoommateC,
  getGastosC,
  postGastosC,
  putGastosC,
  delGastosC,
};
