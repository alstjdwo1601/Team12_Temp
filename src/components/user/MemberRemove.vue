<template>
  <div>
    <hr />
    <v-card class="mx-auto" max-width="800">
      <v-card-text>
        <h1>회원 탈퇴 페이지</h1>
        <hr />
        <br />
        <br />
        <h4>그동안 HappyHouse를 이용해 주셔서 감사합니다.</h4>
      </v-card-text>
      <br />
      <br />
      <b-button variant="danger" @click="deleteInfo" class="mr-1"
        >탈퇴 완료하기</b-button
      >&nbsp;&nbsp;
      <b-button variant="primary" @click="back" class="mr-1">돌아가기</b-button>
      <br />
      <br />
    </v-card>
    <br />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberRemove",

  data() {
    return {};
  },

  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    ...mapActions(memberStore, ["deleteUser"]),
    back() {
      this.$router.push({ name: "MyPage" });
    },
    deleteInfo() {
      this.deleteUser(this.userInfo.userid);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>
