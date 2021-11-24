<template>
  <b-container
    v-if="checked && checked.length != 0"
    class="bv-example-row mt-3"
  >
    <span>관심아파트</span>
    <house-a-list-row
      v-for="(check, index) in checked"
      :key="index"
      :check="check"
    />
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
import HouseAListRow from "@/components/house/HouseAListRow.vue";
import { mapActions, mapState, mapMutations } from "vuex";

const houseStore = "houseStore";
const memberStore = "memberStore";

export default {
  name: "HouseAList",
  components: {
    HouseAListRow,
  },
  data() {
    return {
      pg: 1,
      aptCode: null,
      word: null,
    };
  },
  created() {
    this.CLEAR_CHECKED();
    if (this.isLogin) {
      let params = {
        pg: 1,
        spp: 5,
        id: this.userInfo.userid,
      };
      //aptcode 구하기
      this.gAttention(params);
      //id에 저장된 aptcode 갯수
      this.gTotal(params);
    }
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapState(houseStore, ["checked", "atotal"]),
    totalCnt() {
      let listLeng = this.atotal,
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
    ...mapMutations(houseStore, ["CLEAR_CHECKED"]),
    ...mapActions(houseStore, ["gAttention", "gTotal"]),
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
        spp: 5,
        id: this.userInfo.userid,
      };
      this.gAttention(param);
    },
  },
};
</script>

<style></style>
