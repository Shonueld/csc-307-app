import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService.getUsers(name, job).then((users) => {
    res.send({users_list: users});
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send(error.message);
  });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService.addUser(userToAdd).then((createdUser) => {
    res.status(201).send(createdUser);
  })
  .catch((error) => {
    console.log(error);
    res.status(400).send(error.message);
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; 

  userService.findUserById(id)
  .then((user) => {
    if(!user){
    res.status(404).send("User not found.");
    } else {
      res.send(user);
    }
  })
  .catch((error) => {
    res.status(400).send(error.message);
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];

  userService.deleteUserById(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("User not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

