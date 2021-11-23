<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <v-simple-table white>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">아이디</th>
                <th class="text-center">비밀번호</th>
                <th class="text-center">이름</th>
                <th class="text-center">이메일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <v-text-field
                    :rules="rules"
                    v-model="user.userid"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    :rules="rules"
                    v-model="user.userpwd"
                  ></v-text-field>
                </td>
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
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <b-button variant="warning" @click="joinUser" class="mr-1"
          >가입 완료</b-button
        >
        &nbsp;&nbsp;
        <b-button variant="danger" @click="back" class="mr-1"
          >돌아가기</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { join } from "../../api/member";

export default {
  name: "MemberJoin",
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
  methods: {
    back() {
      this.$router.push({ name: "Home" });
    },
    joinUser() {
      join(
        this.user,
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>
