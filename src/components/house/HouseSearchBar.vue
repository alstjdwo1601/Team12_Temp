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
    <b-row class="mb-3">
      <b-col class="text-right">
        <b-button variant="outline-danger" style="float: right" @click="reset"
          >초기화</b-button
        >
        <b-button
          variant="outline-primary"
          style="float: right"
          @click="searchPg"
          >검색</b-button
        >
        <b-form-input
          v-model="word"
          style="width: 250px; float: right"
        ></b-form-input>
      </b-col>
    </b-row>
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
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "apts"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.CLEAR_APT_LIST();
    this.CLEAR_HOUSE_LIST();
    this.CLEAR_DETAIL_HOUSE();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getAptList",
      "getHouseList",
    ]),
    ...mapMutations(houseStore, [
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
      this.CLEAR_APT_LIST();
      this.CLEAR_HOUSE_LIST();
      this.CLEAR_DETAIL_HOUSE();
      this.CLEAR_GUGUN_LIST();
      this.CLEAR_DONG_LIST();
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },

    dongList() {
      this.CLEAR_APT_LIST();
      this.CLEAR_HOUSE_LIST();
      this.CLEAR_DETAIL_HOUSE();
      this.CLEAR_DONG_LIST();
      if (this.gugunCode) {
        this.getDong(this.gugunCode);
      }
    },

    searchApt() {
      this.CLEAR_APT_LIST();
      if (this.dongCode) {
        let param = {
          pg: 1,
          dongCode: this.dongCode,
          word: null,
        };
        eventBus.$emit("aptList", param);
      }
    },

    searchPg() {
      let param = {
        pg: 1,
        dongCode: this.dongCode,
        word: this.word,
      };
      eventBus.$emit("aptList", param);
    },

    reset() {
      this.CLEAR_SIDO_LIST();
      this.CLEAR_GUGUN_LIST();
      this.CLEAR_DONG_LIST();
      this.CLEAR_APT_LIST();
      this.CLEAR_HOUSE_LIST();
      this.CLEAR_DETAIL_HOUSE();
      this.word = null;
      eventBus.$emit("mapReset");
      eventBus.$emit("showDetail", true);
      this.getSido();
    },
  },
};
</script>

<style></style>
