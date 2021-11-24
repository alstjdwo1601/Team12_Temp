<template>
  <b-row
    class="m-2"
    @click="selectHouse"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col cols="2" class="text-center align-self-center">
      <b-form-checkbox
        v-model="flag"
        @change="checkbox(check)"
        switch
      ></b-form-checkbox>
    </b-col>
    <b-col cols="10" class="align-self-center">
      [{{ attention.aptCode }}] {{ attention.aptName }}
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { eventBus } from "../../main.js";
import { setAttention, delAttention } from "@/api/house.js";
import { getHouseInfo } from "@/api/house.js";
const houseStore = "houseStore";
const memberStore = "memberStore";

export default {
  name: "HouseAListRow",
  data() {
    return {
      isColor: false,
      flag: true,
      attention: {},
    };
  },
  props: {
    check: Number,
  },
  created() {
    let param = {
      aptCode: this.check,
    };
    getHouseInfo(
      param,
      ({ data }) => {
        this.attention = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(houseStore, ["CLEAR_CHECKED"]),
    ...mapActions(houseStore, ["gAttention"]),
    selectHouse() {
      //this.detailHouse(this.apt);
      eventBus.$emit("showDetail", false);
    },
    colorChange(flag) {
      this.isColor = flag;
      if (flag) {
        //this.selectHouse();
        eventBus.$emit("showDetail", false);
      } else {
        eventBus.$emit("showDetail", true);
      }
    },
    //선택시 이벤트(관심아파트 db에 저장)
    checkbox(data) {
      if (this.userInfo) {
        let params = {
          id: this.userInfo.userid,
          aptCode: data,
        };
        if (this.flag) {
          //관심아파트 저장
          setAttention(
            params,
            (response) => {
              console.log(response.data);
              this.CLEAR_CHECKED();
              this.gAttention(params);
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          //관심아파트 삭제
          delAttention(
            params,
            (response) => {
              console.log(response.data);
              this.CLEAR_CHECKED();
              this.gAttention(params);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      } else {
        alert("로그인 후 이용해주세요.");
        this.flag = false;
      }
    },
  },
};
</script>

<style></style>
