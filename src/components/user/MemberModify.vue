<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="primary" show><h3>회원 정보 수정하기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>Modify Page</template>

          <template #lead> 내 정보 수정 페이지 입니다. </template>

          <hr class="my-4" />

          <b-container class="mt-5">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디: </b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userid }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <br />
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름: </b-col
              ><b-col cols="4" align-self="start"
                ><input type="text" v-model="user.username"
              /></b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <br />
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">비밀번호: </b-col
              ><b-col cols="4" align-self="start"
                ><input type="text" v-model="user.userpwd"
              /></b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <br />
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일: </b-col
              ><b-col cols="4" align-self="start"
                ><input type="text" v-model="user.email"
              /></b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <br />
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일: </b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.joindate
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button variant="warning" @click="modifyUser" class="mr-1"
            >수정 완료</b-button
          >
          &nbsp;&nbsp;
          <b-button variant="danger" @click="back" class="mr-1"
            >돌아가기</b-button
          >
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberModify",
  data() {
    return {
      user: {
        userid: "",
        username: "",
        userpwd: "",
        email: "",
      },
    };
  },
  mounted() {
    this.user.userid = this.userInfo.userid;
    this.user.username = this.userInfo.username;
    this.user.userpwd = this.userInfo.userpwd;
    this.user.email = this.userInfo.email;
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userModify"]),
    back() {
      this.$router.push({ name: "MyPage" });
    },
    modifyUser() {
      this.userModify(this.user);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>
