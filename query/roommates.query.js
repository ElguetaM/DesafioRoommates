import axios from "axios";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const urlRoommates = "https://randomuser.me/api";
const roommatesPath = "./JSON/roommates.json";
const gastosPath = "./JSON/gastos.json";

const getRoommatesQ = async () => {
  try {
    const roommatesJSON = await JSON.parse(
      fs.readFileSync(roommatesPath, "utf-8")
    );
    return roommatesJSON;
  } catch (error) {
    console.log(error.message);
  }
};

const postRoommateQ = async () => {
  try {
    const data = await axios.get(urlRoommates);
    const id = uuidv4().slice(0, 4);
    const roommate = data.data.results[0];
    const newRoomie = {
      id: id,
      nombre: `${roommate.name.first} ${roommate.name.last}`,
      debe: 0,
      recibe: 0,
      email: roommate.email,
    };
    const roommatesJSON = await JSON.parse(
      fs.readFileSync(roommatesPath, "utf-8")
    );
    roommatesJSON.roommates.push(newRoomie);
    fs.writeFileSync(roommatesPath, JSON.stringify(roommatesJSON));
  } catch (error) {
    console.log(error.message);
  }
};

const getGastosQ = async () => {
  try {
    const gastosJSON = await JSON.parse(fs.readFileSync(gastosPath, "utf-8"));
    return gastosJSON;
  } catch (error) {
    console.log(error.message);
  }
};

const postGastosQ = async (gasto) => {
  try {
    const id = uuidv4().slice(0, 4);
    const newGasto = {
      roommate: gasto[0],
      descripcion: gasto[1],
      monto: gasto[2],
      id: id,
    };
    const gastosJSON = await JSON.parse(fs.readFileSync(gastosPath, "utf-8"));
    gastosJSON.gastos.push(newGasto);
    fs.writeFileSync(gastosPath, JSON.stringify(gastosJSON));
  } catch (error) {
    console.log(error.message);
  }
};

const putGastosQ = async (gasto, id) => {
};

const delGastosQ = async (id) => {
  try {
    let { gastos } = await JSON.parse(fs.readFileSync(gastosPath, "utf-8"));
    gastos = gastos.filter((g) => g.id !== id);
    fs.writeFileSync(gastosPath, JSON.stringify({ gastos }));
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getRoommatesQ,
  postRoommateQ,
  getGastosQ,
  postGastosQ,
  putGastosQ,
  delGastosQ,
};
