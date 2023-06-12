import people from "./users.js";

let users = people;

export const findAllUsers = () => users;

export const findUserById = (uid) => {
  const index = users.findIndex((u) => u._id === uid);
  if (index !== -1) return users[index];
  return null;
};

export const findUserByUsername = (username) => {
  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) return users[index];
  return null;
};

export const findUserByCredentials = (username, password) => {
  const index = users.findIndex(
    (u) => u.username === username && u.password === password
  );
  if (index !== -1) return users[index];
  return null;
};

export const createUser = (user) => {
  const newUser = { ...user, _id: new Date().getTime().toString() };
  users.push(newUser);
  return newUser;
};

export const updateUser = (uid, user) => {
  const index = users.findIndex((u) => u._id === uid);
  if (index !== -1) {
    users[index] = { ...users[index], ...user };
    return users[index];
  }
  return null;
};

export const deleteUser = (uid) => {
  const index = users.findIndex((u) => u._id === uid);
  if (index !== -1) {
    users.splice(index, 1);
    return { status: "ok" };
  }
  return null;
};
