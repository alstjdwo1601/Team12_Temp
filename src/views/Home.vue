<template>
  <div>
    <v-app id="inspire">
      <v-parallax
        height="1100"
        dark
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      >
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="text-h4 font-weight-thin mb-6">Happy House</h1>
            <h4 class="subheading">Find the house you want</h4>
          </v-col>
        </v-row>
      </v-parallax>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "Main",
  props: {
    msg: String,
  },
  data: () => ({
    items: [
      {
        img: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_960_720.jpg",
      },
      {
        img: "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041__340.jpg",
      },
      {
        img: "https://cdn.pixabay.com/photo/2017/03/19/01/43/living-room-2155376__340.jpg",
      },
    ],
    transparent: "rgba(255, 255, 255, 0)",
  }),
};
</script>

<style scoped></style>
