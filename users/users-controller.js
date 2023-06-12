import people from "./users.js";
import * as usersDao from "./users-dao.js";

let users = people;

const UserController = (app) => {
  app.get("/api/users", findUsers);
  app.get("/api/users/:uid", findUserById);
  app.post("/api/users", createUser);
  app.delete("/api/users/:uid", deleteUser);
  app.put("/api/users/:uid", updateUser);
};

const updateUser = (req, res) => {
  const userId = req.params.uid;
  const updates = req.body;
  const updatedUser = usersDao.updateUser(userId, updates);
  req.session.currentUser = updatedUser;
  console.log(users);
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  const userId = req.params.uid;
  users = users.filter((user) => user._id !== userId);
  res.sendStatus(200);
};

const createUser = (req, res) => {
  const newUser = req.body;
  newUser._id = new Date().getTime().toString();
  users.push(newUser);
  console.log(users);
  res.json(newUser);
};

const findUserById = (req, res) => {
  const userId = req.params.uid;
  const user = users.find((user) => user._id === userId);
  res.json(user);
};

const findUsers = (req, res) => {
  const allUsers = usersDao.findAllUsers();
  res.json(allUsers);
};

export default UserController;
