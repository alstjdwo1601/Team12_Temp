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
                  <v-text-field v-model="user.userid"></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="user.userpwd"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="영어와 숫자를 혼합해주세요."
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field v-model="user.username"></v-text-field>
                </td>
                <td>
                  <v-text-field v-model="user.email"></v-text-field>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <br />
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
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "Password",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
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
