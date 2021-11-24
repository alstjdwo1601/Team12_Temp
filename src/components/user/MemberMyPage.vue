<template>
  <div id="min">
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
        <v-simple-table>
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
                <td>{{ userInfo.username }}</td>
                <td>{{ userInfo.email }}</td>
                <td>{{ userInfo.joindate }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <!--
        여기에 관심아파트 목록 테이블 추가



        <v-simple-table dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">이미지</th>
                <th class="text-center">아파트명</th>
                <th class="text-center">일련번호</th>
                <th class="text-center">거리정보?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{  }}</td>
                <td>{{  }}</td>
                <td>{{  }}</td>
                <td>{{  }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      -->

      <b-button variant="warning" class="mr-1"
        ><router-link :to="{ name: 'Modify' }" class="link align-self-center"
          >정보수정</router-link
        ></b-button
      >
      &nbsp;&nbsp;

      <b-button variant="danger" class="mr-1"
        ><router-link :to="{ name: 'Remove' }" class="link align-self-center"
          >회원탈퇴</router-link
        ></b-button
      >
      <br />
      <br />
    </v-card>
    <br />
  </div>
</template>

<script>
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },

  methods: {},
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

#min {
  font-family: "SLEIGothicTTF";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SLEIGothicTTF.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>
