<template>
  <div>
    <h1>This is Chat Room</h1>
    <h2>{{ userData.userName }}님 안녕하세요.</h2>
    <chat-list :msgs="msgData"></chat-list>
    <chat-form @submitMessage="sendMessage"></chat-form>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import ChatList from "@/components/ChatList";
import ChatForm from "@/components/ChatForm";
import Constant from "@/Constant";

export default {
  data() {
    return {
      userData: null,
    };
  },
  components: {
    ChatList: ChatList,
    ChatForm: ChatForm,
  },
  computed: {
    ...mapState({
      msgData: (state) => state.socket.msgData,
    }),
  },
  created() {
    this.userData = this.$route.params.userData;

    this.$socket.on("chat", (data) => {
      this.pushMsgData(data);
    });
  },
  methods: {
    ...mapMutations({
      pushMsgData: Constant.PUSH_MSG_DATA,
    }),
    sendMessage(msg) {
      const username = this.userData.userName;

      this.pushMsgData({
        from: {
          name: "나",
        },
        msg,
      }),
        this.$sendMessage({
          name: username,
          msg,
        });
    },
  },
};
</script>

<style></style>
