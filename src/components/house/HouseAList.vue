<template>
  <b-container
    v-if="checked && checked.length != 0"
    class="bv-example-row mt-3"
  >
    <span
      >&nbsp;&nbsp;&nbsp;&nbsp;<img
        class="white--text align-end"
        height="20px"
        src="@/assets/favourite.png"
      />&nbsp;&nbsp;&nbsp;<b>내 관심아파트 목록</b></span
    >
    <br />
    <hr />
    <house-a-list-row
      v-for="(check, index) in checked"
      :key="index"
      :check="check"
      :pg="pg"
      :index="index"
    />
    <br />
    <b-button-toolbar
      class="mb-5"
      key-nav
      aria-label="Toolbar with button groups"
      style="justify-content: center"
    >
      <br />
      <b-button-group class="mx-1">
        <b-button
          size="sm"
          variant="warning"
          :disabled="pg == 1"
          @click="firstPg"
          >&laquo;</b-button
        >
        <b-button size="sm" variant="warning" :disabled="pg == 1" @click="prePg"
          >&lsaquo;</b-button
        >
      </b-button-group>
      <span class="mt-1">&nbsp; {{ pg }} / {{ totalCnt }} page&nbsp;</span>
      <b-button-group class="mx-1">
        <b-button
          size="sm"
          variant="warning"
          :disabled="pg == totalCnt"
          @click="nextPg"
          >&rsaquo;</b-button
        >
        <b-button
          size="sm"
          variant="warning"
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
import { eventBus } from "../../main.js";

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
    };
  },
  created() {
    if (this.isLogin) {
      this.CLEAR_CHECKED();
      let param = {
        pg: 1,
        id: this.userInfo.userid,
      };
      this.gAttention(param);

      let params = {
        id: this.userInfo.userid,
      };
      this.gTotal(params);

      eventBus.$emit("markerMapA", this.userhouse);
    }
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapState(houseStore, ["checked", "atotal", "userhouse"]),
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
    ...mapMutations(houseStore, ["CLEAR_CHECKED", "CLEAR_USERHOUSE_LIST"]),
    ...mapActions(houseStore, ["gAttention", "gTotal", "getUserHouseList"]),
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
      this.CLEAR_CHECKED();
      console.log("aL - 체크 삭제");
      let param = {
        pg: pgNum,
        spp: 5,
        id: this.userInfo.userid,
      };
      this.gAttention(param);
      console.log("aL - 체크 추가");
    },
  },
};
</script>

<style></style>
