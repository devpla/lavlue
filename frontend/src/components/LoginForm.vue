<template>
  <div class="login__form">
    <label for="input-file" class="login__form__label">
      <img v-if="userImage" :src="userImage" class="login__form__avatar" />
      <div class="login__form__avatar__overlay">
        <img src="../assets/camera.svg" alt="" />
      </div>
    </label>
    <input
      id="input-file"
      type="file"
      @change="uploadImages"
      accept="image/*"
      style="display: none"
    />
    <div class="login__form__username">
      <label for="input-username" class="login__form__username__label">
        닉네임을 입력하세요.
      </label>
      <input
        id="input-username"
        class="login__form__username__input"
        type="text"
        v-model.trim="userName"
        @keyup.enter="joinSubmit"
        required
      />
      <!-- <button @click="joinSubmit">JOIN</button> -->
    </div>
  </div>
</template>

<script>
import Compressor from "compressorjs";

export default {
  data() {
    return {
      userImage: require("../assets/avatar.svg"),
      userName: "",
    };
  },
  methods: {
    uploadImages(e) {
      const imgFile = e.target.files[0];
      const vueThis = this;

      new Compressor(imgFile, {
        quality: 0.1,
        success(res) {
          const formData = new FormData();
          formData.append("file", res, res.name);

          const reader = new FileReader();
          reader.readAsDataURL(res);

          reader.addEventListener(
            "load",
            () => {
              vueThis.userImage = reader.result;
            },
            false
          );
        },
        error(err) {
          console.log(err.message);
        },
      });
    },

    joinSubmit() {
      const userData = {
        userImage: this.userImage,
        userName: this.userName,
      };

      if (userData.userName) {
        this.$store.dispatch("login", userData);
        this.$router.push({
          name: "chat",
          params: { userData: userData },
        });
      }
    },
  },
};
</script>

<style>
.login__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login__form__label {
  position: relative;
}

.login__form__avatar {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.login__form__avatar__overlay {
  position: absolute;
  background-color: #000;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  opacity: 0;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.login__form__label:hover .login__form__avatar__overlay {
  opacity: 0.2;
}

.login__form__username {
  margin-top: 2rem;
}

.login__form__username__label {
  display: block;
  text-align: center;
  font-weight: 700;
  color: #292929;
}

.login__form__username__input {
  width: 8rem;
  margin-top: 2rem;
  padding: 0.4rem;
  border: none;
  border-bottom: 1.5px solid #afb4b8;
  text-align: center;
  font-size: 18px;
}

.login__form__username__input:focus {
  outline: none;
}
</style>
