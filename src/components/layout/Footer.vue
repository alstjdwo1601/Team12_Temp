<template>
  <div>
    <br />
    <br />

    <v-footer color="warning lighten-1">
      <v-card flat tile class="warning lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          <p style="font-family: sans-serif">
            SSAFY 6기 Final Project / 대표자 번호 : 010 - 1111 - 2222 /
            Copyright © SSAFY All Rights Reserved. / 사업자 번호 : 000 - 11 -
            22222 / Made by Hosung Lee , Sungjae Min / 소재지 : (주)멀티캠퍼스
            서울특별시 강남구 언주로 508(역삼동, 서울상록빌딩) / 고객센터 : 02 -
            1234 - 5678 / 본 사이트의 콘텐츠는 무단 배포, 복사 등을 금합니다. /
            이메일 : SSAFY@naver.com
          </p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>SSAFY</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style></style>
