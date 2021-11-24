<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col> </b-col>
    </b-row>
    <board-write-form type="register" />
  </b-container>
</template>

<script>
import BoardWriteForm from "./child/BoardWriteForm.vue";

export default {
  name: "BoardWrite",
  components: {
    BoardWriteForm,
  },
};
</script>

<style></style>
