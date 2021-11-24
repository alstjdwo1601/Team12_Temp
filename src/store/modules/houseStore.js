import {
  sidoList,
  gugunList,
  dongList,
  aptList,
  houseList,
  getTotal,
  getAttention,
  getCnt,
} from "@/api/house.js";
import { eventBus } from "../../main.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],

    atotal: 0,
    total: 0,
    apts: [],
    houses: [],
    house: [],
    attentions: {},
    checked: [],
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST: (state, dongs) => {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },
    SET_CNT: (state, total) => {
      state.total = total;
    },
    SET_CNT_ATTENTION: (state, cnt) => {
      state.atotal = cnt;
    },
    SET_ATTENTION_INFO: (state, atten) => {
      state.attentions = atten;
    },
    CLEAR_ATTENTION_INFO: (state) => {
      state.attentions = {};
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_DONG_LIST: (state) => {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },
    SET_APT_LIST: (state, apts) => {
      state.apts = apts;
      eventBus.$emit("markerMap", apts);
    },
    SET_HOUSE_LIST: (state, houses) => {
      //   console.log(houses);
      state.houses = houses;
    },
    SET_DETAIL_HOUSE: (state, apt) => {
      state.house = [
        {
          아파트: apt.aptName,
          일련번호: apt.aptCode,
          법정동: apt.dongName,
          건립연도: apt.buildYear,
          지번: apt.jibun,
        },
      ];
    },
    SET_CHECKED: (state, checks) => {
      checks.forEach((check) => {
        state.checked.push(check.aptCode);
      });
    },
    CLEAR_APT_LIST: (state) => {
      state.apts = [];
    },
    CLEAR_HOUSE_LIST: (state) => {
      state.houses = [];
    },
    CLEAR_DETAIL_HOUSE: (state) => {
      state.house = [];
    },
    CLEAR_CHECKED: (state) => {
      state.checked = [];
    },
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      dongList(
        params,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getAptList: ({ commit }, param) => {
      const params = {
        pg: param.pg,
        spp: 5,
        word: param.word,
        dong: param.dongCode,
      };
      aptList(
        params,
        ({ data }) => {
          commit("SET_APT_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    cntTotal: ({ commit }, param) => {
      let params = {
        word: param.word,
        dong: param.dongCode,
      };
      getTotal(
        params,
        ({ data }) => {
          commit("SET_CNT", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseList: ({ commit }, gugunCode) => {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      //   const SERVICE_KEY =
      //     "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202110",
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      houseList(
        params,
        (response) => {
          commit("SET_HOUSE_LIST", response.data.response.body.items.item);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, apt) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", apt);
    },
    gAttention: ({ commit }, param) => {
      getAttention(
        param,
        ({ data }) => {
          commit("SET_CHECKED", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    gTotal: ({ commit }, params) => {
      let param = {
        id: params.id,
      };
      getCnt(
        param,
        ({ data }) => {
          commit("SET_CNT_ATTENTION", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default houseStore;
