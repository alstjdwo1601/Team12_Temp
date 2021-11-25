<template>
  <router-view />
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

const houseStore = "houseStore";
const memberStore = "memberStore";

export default {
  name: "HouseAL",
  created() {
    this.CLEAR_APT_LIST();
    if (this.isLogin) {
      this.CLEAR_A_LIST();
      let params = {
        id: this.userInfo.userid,
      };
      this.getAttentionList(params);

      let param = {
        word: this.setword,
        dong: this.setdong,
      };
      this.cntTotal(param);
    }
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapState(houseStore, [
      "setdong",
      "setword",
      "checked",
      "total",
      "userhouse",
    ]),
  },
  methods: {
    ...mapMutations(houseStore, [
      "CLEAR_A_LIST",
      "CLEAR_APT_LIST",
      "CLEAR_WORD",
      "CLEAR_DONG",
    ]),
    ...mapActions(houseStore, [
      "getAttentionList",
      "getUserHouseList",
      "cntTotal",
    ]),
  },
};
</script>

<style></style>
