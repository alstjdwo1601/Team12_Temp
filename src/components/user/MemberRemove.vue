<template>
  <div>
    <b-jumbotron>
      <template #header>Withdrawal Page</template>

      <template #lead> 회원 탈퇴 페이지입니다. </template>

      <hr class="my-4" />

      <b-button variant="danger" @click="removeUser" class="mr-1"
        >탈퇴 완료하기</b-button
      >&nbsp;&nbsp;
      <b-button variant="primary" @click="back" class="mr-1">돌아가기</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

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
    back() {
      this.$router.push({ name: "MyPage" });
    },
    removeUser() {
      alert("삭제 전임");
      axios.put("http://localhost/remove/" + this.userid).then(() => {
        alert("삭제 완료!");
        this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>

<style></style>
