/*
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 16:04:10
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2024-01-04 01:35:09
 * @FilePath: \nmhv1.0\nmhv1.0\src\service\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from "../utils/request";

const api = {
  login: "/user/Login",
  getUsers: "/user/Page",
  addUsers: "/user/save",
  updateStates(id) {
    return `/user/states?userId=${id}`;
  },
  updateUsers: "/user/update",
  dict: "/dict",
  dictDetail: "/dict/getName",
  addDict: "/dict/save",
  updateDdict: "/dict",
  searchDict: "/dict/get/",
  getEnclosureList: "/pastures",
  getEnclosureDetals(pageNumber, pageSize) {
    return `enclosures/getByT?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  },
  addEnclosure: "/enclosures",
  updateElsStatus: "/enclosures/modifyState",
  deleteElsStatus: "/enclosures",
  updateEls: "/enclosures",
  getElsById: "enclosures/ById",
  getPastureById: "/pastures/PastrueDetail",
  getPasture: "/pastures/queryPasture",
  deletePasture: "/pastures/deletePasture",
  setPasStates: "/pastures/changeStates",
  addPasture: "/pastures/insertPasture",
  getCity: "/city",
  updatePasture: "/pastures/updatePasture",
};

export const login = (data = {}) => {
  return http({
    url: api.login,
    method: "post",
    data,
  });
};
export const getUsers = (params = {}) => {
  return http({
    url: api.getUsers,
    method: "get",
    params,
  });
};
export const addUsers = (data = {}) => {
  return http({
    url: api.addUsers,
    method: "post",
    data,
  });
};
export const updateStates = (id, data = {}) => {
  return http({
    url: api.updateStates(id),
    method: "post",
    data,
  });
};
export const updateUsers = (data = {}) => {
  return http({
    url: api.updateUsers,
    method: "put",
    data,
  });
};
export const getDictList = (params = {}) => {
  return http({
    url: api.dict,
    method: "get",
    params,
  });
};
export const dictDetail = (params = {}) => {
  return http({
    url: api.dictDetail,
    method: "get",
    params,
  });
};
export const addDict = (data = {}) => {
  return http({
    url: api.addDict,
    method: "post",
    data,
  });
};
export const updateDdict = (data = {}) => {
  return http({
    url: api.updateDdict,
    method: "put",
    data,
  });
};
export const searchDict = (params = {}) => {
  return http({
    url: api.searchDict,
    method: "get",
    params,
  });
};
export const getEnclosureList = (params = {}) => {
  return http({
    url: api.getEnclosureList,
    method: "get",
    params,
  });
};
export const getEnclosureDetals = (pageNumber, pageSize, data = {}) => {
  return http({
    url: api.getEnclosureDetals(pageNumber, pageSize),
    method: "post",
    data,
  });
};
export const addEnclosure = (data = {}) => {
  return http({
    url: api.addEnclosure,
    method: "post",
    data,
  });
};
export const updateElsStatus = (data = {}) => {
  return http({
    url: api.updateElsStatus,
    method: "put",
    data,
  });
};
export const deleteElsStatus = (data = {}) => {
  return http({
    url: api.deleteElsStatus,
    method: "delete",
    data,
  });
};
export const updateEls = (data = {}) => {
  return http({
    url: api.updateEls,
    method: "put",
    data,
  });
};
export const getElsById = (params = {}) => {
  return http({
    url: api.getElsById,
    method: "get",
    params,
  });
};
export const getPastureById = (params = {}) => {
  return http({
    url: api.getPastureById,
    method: "get",
    params,
  });
};
export const getPasture = (params = {}) => {
  return http({
    url: api.getPasture,
    method: "get",
    params,
  });
};
export const deletePasture = (params = {}) => {
  return http({
    url: api.deletePasture,
    method: "delete",
    params,
  });
};
export const setPasStates = (params = {}) => {
  return http({
    url: api.setPasStates,
    method: "post",
    params,
  });
};
export const addPasture = (data = {}) => {
  return http({
    url: api.addPasture,
    method: "post",
    data,
  });
};
export const getCity = (params = {}) => {
  return http({
    url: api.getCity,
    method: "get",
    params,
  });
};
export const updatePasture = (data = {}) => {
  return http({
    url: api.updatePasture,
    method: "put",
    data,
  });
};
