<template>
  <div class="chat">
    <div class="chat__header">
      <span class="chat__header__greetings">
        안녕하세요. {{ userData.userName }}님!
      </span>
    </div>
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
    ChatList,
    ChatForm,
  },
  computed: {
    ...mapState({
      msgData: (state) => state.socket.msgData,
    }),
  },
  created() {
    this.userData = this.$route.params.userData;
  },

  mounted() {
    this.$socket.on("chat", (data) => {
      this.pushMsgData(data);

      setTimeout(() => {
        const element = document.getElementById("chat__body");
        element.scrollTop = element.scrollHeight;
      }, 0);
    });
  },

  methods: {
    ...mapMutations({
      pushMsgData: Constant.PUSH_MSG_DATA,
    }),

    sendMessage(msg) {
      const username = this.userData.userName;
      const avatar = this.userData.userImage;

      this.pushMsgData({
        from: {
          name: "DevplaCalledMe",
          avatar: avatar,
        },
        msg,
      });

      this.$sendMessage({
        name: username,
        msg,
        avatar: avatar,
      });

      setTimeout(() => {
        const element = document.getElementById("chat__body");
        element.scrollTop = element.scrollHeight;
      }, 0);
    },
  },
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat__header {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  border-radius: 24px 24px 0px 0px;
  padding: 1.8rem;
  font-size: 16px;
  font-weight: 700;
}

.chat__header__greetings {
  color: #292929;
}
</style>
