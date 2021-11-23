<template>
  <b-container v-if="apts && apts.length != 0" class="bv-example-row mt-3">
    <house-list-row v-for="(apt, index) in apts" :key="index" :apt="apt" />
    <b-button-toolbar
      class="mb-5"
      key-nav
      aria-label="Toolbar with button groups"
      style="justify-content: center"
    >
      <b-button-group class="mx-1">
        <b-button
          size="sm"
          variant="primary"
          :disabled="pg == 1"
          @click="firstPg"
          >&laquo;</b-button
        >
        <b-button size="sm" variant="primary" :disabled="pg == 1" @click="prePg"
          >&lsaquo;</b-button
        >
      </b-button-group>
      <span class="mt-1">&nbsp; {{ pg }} / {{ totalCnt }} page&nbsp;</span>
      <b-button-group class="mx-1">
        <b-button
          size="sm"
          variant="primary"
          :disabled="pg == totalCnt"
          @click="nextPg"
          >&rsaquo;</b-button
        >
        <b-button
          size="sm"
          variant="primary"
          :disabled="pg == totalCnt"
          @click="endPg"
          >&raquo;</b-button
        >
      </b-button-group>
    </b-button-toolbar>
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
import { mapActions, mapState } from "vuex";
import { eventBus } from "../../main.js";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListRow,
  },
  data() {
    return {
      pg: 1,
      dongCode: null,
      word: null,
    };
  },
  mounted() {
    eventBus.$on("aptList", (data) => {
      this.getAptList(data);
      this.cntTotal(data);
      this.dongCode = data.dongCode;
      this.word = data.word;
    });
  },
  computed: {
    ...mapState(houseStore, ["apts", "total"]),
    totalCnt() {
      let listLeng = this.total,
        listSize = 5,
        page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    },
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
  methods: {
    ...mapActions(houseStore, ["getAptList", "cntTotal"]),
    firstPg() {
      this.pg = 1;
      this.chagePg(this.pg);
    },
    prePg() {
      this.pg--;
      this.chagePg(this.pg);
    },
    nextPg() {
      this.pg++;
      this.chagePg(this.pg);
    },
    endPg() {
      this.pg = this.totalCnt;
      this.chagePg(this.pg);
    },
    chagePg(pgNum) {
      let param = {
        pg: pgNum,
        dongCode: this.dongCode,
        word: this.word,
      };
      this.getAptList(param);
    },
  },
};
</script>

<style></style>
