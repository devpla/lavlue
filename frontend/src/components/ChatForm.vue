<template>
  <div>
    <input type="text" v-model.trim="msg" @keyup.enter="submitMessage" />
    <button @click="submitMessage">전송</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    submitMessage() {
      if (this.msg) {
        this.$emit("submitMessage", this.msg);
        this.msg = "";
      }
    },
  },
};
</script>

<style></style>
