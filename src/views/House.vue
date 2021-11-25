<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <b-col>
        <house-search-bar></house-search-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" align="left">
        &nbsp;&nbsp;&nbsp;&nbsp;
        <b-button variant="warning" @click="houseList" class="mr-1"
          >검색 결과</b-button
        >
        &nbsp;&nbsp;
        <b-button variant="primary" @click="houseAList" class="mr-1"
          >관심아파트 고르기</b-button
        >

        <house-a-l />
      </b-col>
      <b-col cols="6">
        <house-detail />
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
        <house-map></house-map>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";
import HouseMap from "@/components/house/HouseMap.vue";
import HouseAL from "@/components/house/HouseAL.vue";
export default {
  name: "House",
  components: {
    HouseSearchBar,
    HouseDetail,
    HouseMap,
    HouseAL,
  },
  methods: {
    houseList() {
      this.$router.push({ name: "HouseList" });
    },
    houseAList() {
      this.$router.push({ name: "HouseAList" });
    },
  },
};
</script>
<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 149, 27, 0.3) 30%
  );
}
</style>
