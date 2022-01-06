<template>
  <div id="app">
    <router-view class="container" />
    <div class="app__brand">
      <p @click="moveToHome" class="app__logo">lavlue</p>
      <div class="app__copyright">ⓒ 2021 Devpla. All Right Reserved.</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    moveToHome() {
      this.$router.push({ name: "login" });
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");
@font-face {
  font-family: "Golden Plains - Demo";
  src: url("./assets/GoldenPlains.woff2") format("woff2"),
    url("./assets/GoldenPlains.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

* {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", sans-serif;
}

body {
  background-color: #cfcff4;
}

.container {
  max-width: 375px;
  height: 812px;
  background-color: #ffffff;
  margin: 5rem auto 0rem;
  border-radius: 1.5rem;
  box-shadow: 0px 1px 20px #9c9cc855;
}

.app__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app__logo {
  font-family: "Golden Plains - Demo";
  font-size: 4rem;
  text-decoration: none;
  margin-top: 3rem;
  margin-bottom: -10px;
  color: #ffffff;
}

.app__copyright {
  font-size: 10px;
  color: #ffffff;
}
</style>
