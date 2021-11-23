<template>
  <div class="overlaybox">
    <div class="boxtitle"></div>
    <div class="first">
      <img
        :src="require('@/assets/apt.png')"
        fluid-grow
        style="width: 247px; height: 136px"
        alt=""
      />
    </div>
    <ul>
      <li class="up">
        <span class="title">건축년도</span>
        <span class="count"></span>
      </li>
      <li>
        <span class="title">주소</span>
        <span class="count"></span>
      </li>
      <li>
        <span class="title">최신거래금액</span>
        <span class="count"></span>
      </li>
      <li>
        <span
          class="last"
          id="recenthistor"
          data-toggle="modal"
          data-target="#myModal"
          >아파트정보 update</span
        >
      </li>
    </ul>
  </div>
  <!--
  <b-container v-if="house" class="bv-example-row">
    <b-row>
      <b-col
        ><h3>{{ house.아파트 }}</h3></b-col
      >
    </b-row>
    <b-row class="mb-2 mt-1">
      <b-col
        ><b-img :src="require('@/assets/apt.png')" fluid-grow></b-img
      ></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="secondary"
          >일련번호 : {{ house.일련번호 }}</b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="primary"
          >아파트 이름 : {{ house.아파트 }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="info">법정동 : {{ house.법정동 }} </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="warning">층수 : {{ house.층 }}층</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="danger"
          >거래금액 :
          {{
            (parseInt(house.거래금액.replace(",", "")) * 10000) | price
          }}원</b-alert
        >
      </b-col>
    </b-row>
  </b-container>
  -->
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseDetail",
  computed: {
    ...mapState(houseStore, ["house"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>
