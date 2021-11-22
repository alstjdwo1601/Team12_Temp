import jwt_decode from "jwt-decode";
import { login } from "@/api/member.js";
import { findById, modify, remove } from "../../api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {}
      );
    },
    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      findById(
        decode_token.userid,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
            console.log(response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    userModify({ commit }, user) {
      const params = {
        userid: user.userid,
        username: user.username,
        userpwd: user.userpwd,
        email: user.email,
      };
      console.log(params);
      modify(
        params,
        ({ data }) => {
          console.log(data);
          commit("SET_USER_INFO", data.userInfo);

          alert("다시 로그인 해주세요.");
        },
        (error) => {
          alert("수정에 실패했습니다.");
          console.log(error);
        }
      );
    },
    deleteUser({ commit }, userid) {
      remove(
        userid,
        () => {
          commit("SET_IS_LOGIN", false);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default memberStore;
