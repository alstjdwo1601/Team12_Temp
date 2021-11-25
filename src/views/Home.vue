<template>
  <div>
    <br />
    <v-card class="mx-auto" max-width="1024">
      <v-img
        class="white--text align-end"
        height="600px"
        src="@/assets/main.jpg"
      >
        <v-card-title></v-card-title>
      </v-img>

      <v-card-text class="text--primary"> </v-card-text>
    </v-card>

    <hr />

    <!--hover-->
    <v-container class="pa-4 text-center">
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in items">
          <v-col :key="i" cols="12" md="4">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-img :src="item.img" height="225px"> </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>
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

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
