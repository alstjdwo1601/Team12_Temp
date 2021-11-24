<template>
  <div>
    <!--card 시작-->
    <hr />
    <v-card :loading="loading" class="mx-auto my-12" max-width="700">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="400" src="@/assets/user.png"></v-img>

      <v-card-title>[{{ userInfo.username }}] 님 회원정보</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
        </v-row>
        <br />
        <br />
        <v-simple-table white>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">아이디</th>
                <th class="text-center">이름</th>
                <th class="text-center">이메일</th>
                <th class="text-center">가입일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ userInfo.userid }}</td>
                <td>
                  <v-text-field
                    :rules="rules"
                    v-model="user.username"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    :rules="rules"
                    v-model="user.email"
                  ></v-text-field>
                </td>
                <td>{{ userInfo.joindate }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <b-button variant="warning" @click="modifyUser" class="mr-1"
        >수정 완료</b-button
      >
      &nbsp;&nbsp;
      <b-button variant="danger" @click="back" class="mr-1">돌아가기</b-button>
      <br />
      <br />
    </v-card>
    <br />
  </div>
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
