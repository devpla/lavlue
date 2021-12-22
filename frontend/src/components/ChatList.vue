<template>
  <div>
    <h4>This is chat list</h4>
    <ul v-for="(msg, index) in msgs" :key="index">
      <li>{{ msg.from.name }} : {{ msg.msg }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["msgs"],
};
</script>

<style></style>
