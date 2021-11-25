<template>
  <b-row class="mt-4 mb-4 text-center">
    <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
    <b-col class="sm-3">
      <b-form-select
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select
        v-model="gugunCode"
        :options="guguns"
        @change="dongList"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select
        v-model="dongCode"
        :options="dongs"
        @change="searchApt"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-input v-model="word"></b-form-input>
    </b-col>
    <div class="mt-2" style="padding-top: 3px">
      <b-button variant="outline-warning" @click="searchPg">검색</b-button>
      &nbsp;&nbsp;
      <b-button variant="outline-primary" @click="reset">초기화</b-button>
    </div>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.

  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }
*/
const houseStore = "houseStore";
import { eventBus } from "../../main.js";

export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      word: null,

      busData: [],
    };
  },
  computed: {
    ...mapState(houseStore, [
      "sidos",
      "guguns",
      "dongs",
      "apts",
      "setdong",
      "setword",
      "total",
    ]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_WORD();
    this.CLEAR_DONG();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getAptList",
      "getHouseList",
      "cntTotal",
    ]),
    ...mapMutations(houseStore, [
      "SET_DONG",
      "SET_WORD",

      "CLEAR_DONG",
      "CLEAR_WORD",
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",

      "CLEAR_APT_LIST",
      "CLEAR_HOUSE_LIST",
      "CLEAR_DETAIL_HOUSE",
    ]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },

    dongList() {
      this.CLEAR_DONG_LIST();
      if (this.gugunCode) {
        this.getDong(this.gugunCode);
      }
    },

    searchApt() {
      this.CLEAR_APT_LIST();
      this.SET_DONG(this.dongCode);

      let param = {
        pg: 1,
        dongCode: this.dongCode,
        word: null,
      };
      this.getAptList(param);

      let params = {
        word: this.setword,
        dong: this.setdong,
      };
      this.cntTotal(params);
    },

    searchPg() {
      this.CLEAR_APT_LIST();
      this.SET_WORD(this.word);

      let param = {
        pg: 1,
        dongCode: this.setdong,
        word: this.setword,
      };
      this.getAptList(param);
      let params = {
        word: this.setword,
        dong: this.setdong,
      };
      this.cntTotal(params);
      console.log(this.total);
    },

    reset() {
      this.CLEAR_SIDO_LIST();
      this.CLEAR_GUGUN_LIST();
      this.CLEAR_DONG_LIST();
      this.CLEAR_APT_LIST();
      this.getSido();
      this.word = null;
      eventBus.$emit("mapReset");
      eventBus.$emit("showDetail", true);
    },
  },
};
</script>

<style></style>
