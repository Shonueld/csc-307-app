import express from "express";
import cors from "cors";

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

  let result = users["users_list"];

  if (name !== undefined) {
    result = result.filter((user) => user["name"] === name);
  }

  if (job !== undefined) {
    result = result.filter((user) => user["job"] === job);
  }

  res.send({ users_list: result });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId(); // generate a random id
  addUser(userToAdd);   // add user to the list
  res.status(201).send(userToAdd); // return created object
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index === -1) {
    res.status(404).send("User not found.");
  } else {
    users["users_list"].splice(index, 1); // remove user
    res.status(204).send(); // No content
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const generateId = () => {
  return Math.random().toString(36).substr(2, 9); // e.g. "a8j4kd02z"
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};
