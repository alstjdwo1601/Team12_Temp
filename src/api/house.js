import { apiInstance, houseInstance } from "./index.js";

const api = apiInstance();
const house = houseInstance();

function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  api.get(`/map/gugun`, { params: params }).then(success).catch(fail);
}

function dongList(params, success, fail) {
  api.get(`/map/dong`, { params: params }).then(success).catch(fail);
}

function aptList(params, success, fail) {
  api.get(`/map/apt`, { params: params }).then(success).catch(fail);
}
function houseList(params, success, fail) {
  house.get(``, { params: params }).then(success).catch(fail);
}
function getTotal(params, success, fail) {
  api.get(`/map/total`, { params: params }).then(success).catch(fail);
}
function setAttention(params, success, fail) {
  api.get(`/map/set`, { params: params }).then(success).catch(fail);
}
function getAttention(params, success, fail) {
  api.get(`/map/get`, { params: params }).then(success).catch(fail);
}
function delAttention(params, success, fail) {
  api.delete(`/map/del`, { params: params }).then(success).catch(fail);
}
export {
  sidoList,
  gugunList,
  dongList,
  aptList,
  houseList,
  getTotal,
  setAttention,
  getAttention,
  delAttention,
};
