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
      this.CLEAR_CHECKED();
      let params = {
        pg: 1,
        id: this.userInfo.userid,
      };
      this.gAttention(params);

      let param = {
        word: this.setword,
        dong: this.setdong,
      };
      this.cntTotal(param);
    }
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapState(houseStore, ["setdong", "setword", "checked", "total"]),
  },
  methods: {
    ...mapMutations(houseStore, [
      "CLEAR_CHECKED",
      "CLEAR_APT_LIST",
      "CLEAR_WORD",
      "CLEAR_DONG",
    ]),
    ...mapActions(houseStore, ["gAttention", "cntTotal"]),
  },
};
</script>

<style></style>
