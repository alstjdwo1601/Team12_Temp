<template>
  <div>
    <b-jumbotron>
      <template #header>Withdrawal Page</template>

      <template #lead> 회원 탈퇴 페이지입니다. </template>

      <hr class="my-4" />

      <b-button variant="danger" @click="deleteInfo" class="mr-1"
        >탈퇴 완료하기</b-button
      >&nbsp;&nbsp;
      <b-button variant="primary" @click="back" class="mr-1">돌아가기</b-button>
    </b-jumbotron>
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
