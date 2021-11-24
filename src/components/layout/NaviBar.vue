<template>
  <div>
    <b-navbar toggleable="lg" type="white" variant="warning">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <b-navbar-brand href="#">
        <router-link to="/">
          <img
            src="@/assets/home.png"
            class="d-inline-block align-middle"
            width="30px"
            alt="Kitten"
          />
        </router-link>
      </b-navbar-brand>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <b-collapse id="nav-collapse" is-nav>
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          v-bind="link"
          class="hidden-sm-and-down"
          text
          @click="onClick($event, link)"
        >
          {{ link.text }}
        </v-btn>

        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center"
            ><img
              src="@/assets/user2.png"
              class="d-inline-block align-middle"
              width="30px"
              alt="Kitten"
            />&nbsp;&nbsp;&nbsp; <b> [{{ userInfo.username }}]</b> 님
            환영합니다.</b-nav-item
          >
          <b-nav-item class="align-self-center"
            ><router-link
              :to="{ name: 'MyPage' }"
              class="link align-self-center"
              >내정보보기</router-link
            ></b-nav-item
          >
          <b-nav-item
            class="link align-self-center"
            @click.prevent="onClickLogout"
            >로그아웃</b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              <img
                src="@/assets/user4.png"
                class="d-inline-block align-middle"
                width="30px"
                alt="Kitten"
              />
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'SignUp' }" class="link"
                ><img
                  src="@/assets/add-user.png"
                  class="d-inline-block align-middle"
                  width="30px"
                  alt="Kitten"
                />&nbsp;&nbsp; 회원가입</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'SignIn' }" class="link"
                ><img
                  src="@/assets/login.png"
                  class="d-inline-block align-middle"
                  width="30px"
                  alt="Kitten"
                />
                &nbsp;&nbsp; 로그인</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

const memberStore = "memberStore";
const templateStore = "templateStore";

export default {
  name: "NaviBar",
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(templateStore, ["links"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },

    onClick(e, item) {
      e.stopPropagation();

      if (item.to || !item.href) return;

      this.$vuetify.goTo(item.href.endsWith("!") ? 0 : item.href);
    },
  },
};
</script>

<style></style>
