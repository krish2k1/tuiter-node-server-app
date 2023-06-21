import * as usersDao from "./users-dao.js";

var currentUserVar;
const AuthController = (app) => {
  const register = async (req, res) => {
    const username = req.body.username;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    req.body.firstName="hi";
    req.body.lastName="hi";
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"]=newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao.findUserByCredentials(username, password);
    if (user) {
      currentUserVar = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile = async (req, res) => {
    const currentUser = currentUserVar;
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = (req, res) => {
    console.log(req.body);
    usersDao.updateUser(req.body._id, req.body);
    res.sendStatus(200);
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users", update);
};
export default AuthController;
