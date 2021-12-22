<template>
  <div>
    <img v-if="userImage" :src="userImage" style="height: 50px; width: 50px" />
    <input type="file" @change="uploadImages" accept="image/*" />
    <input
      class="login__username"
      type="text"
      v-model.trim="userName"
      @keyup.enter="joinSubmit"
      required
    />
    <button @click="joinSubmit">JOIN</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userImage: null,
      userName: "",
    };
  },
  methods: {
    uploadImages(e) {
      const imgFile = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.userImage = reader.result;
      };
      reader.readAsDataURL(imgFile);
    },

    joinSubmit() {
      const userData = {
        userImage: this.userImage,
        userName: this.userName,
        time: new Date().getTime(),
      };
      if (userData.userName) {
        this.$store.dispatch("login", userData);
        console.log(userData);
      }
    },
  },
};
</script>

<style></style>
