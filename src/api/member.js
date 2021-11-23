import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function modify(user, success, fail) {
  api.put(`/user`, JSON.stringify(user)).then(success).catch(fail);
}

async function remove(userid, success, fail) {
  api.delete(`/user/${userid}`).then(success).catch(fail);
}

async function join(params, success, fail) {
  api.post(`/user/join`, JSON.stringify(params)).then(success).catch(fail);
}

// function logout(success, fail)

export { login, findById, modify, remove, join };
