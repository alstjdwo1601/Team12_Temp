<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-steelblue"><b-icon icon="house"></b-icon> SSAFY</h3>

    <hr />

    <b-jumbotron container-fluid="true" style="background-color: #a7eeff">
      <template v-slot:header>Happy House</template>
      <template v-slot:lead> Team 12 </template>
    </b-jumbotron>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-carousel
          id="carousel-no-animation"
          style="text-shadow: 0px 0px 2px #000"
          no-animation
          indicators
          img-width="1024"
          img-height="480"
        >
          <b-carousel-slide
            img-src="https://picsum.photos/1024/480/?image=625"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="https://picsum.photos/1024/480/?image=1076"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="https://picsum.photos/1024/480/?image=1031"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="https://picsum.photos/1024/480/?image=946"
          ></b-carousel-slide>
        </b-carousel>

        <hr />
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Main",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}
</style>
