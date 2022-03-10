<template>

<div style="z-index:1500" class="position-fixed end-0 pe-3">

    

  <div
    v-for="(msg, key) in message"
    :key="key"
    class="toast show"
    :class="`toast${key}`"
    role="alert"
    
  >
   
    <div class="toast-header">
      <span
        :class="`bg-${msg.style}`"
        class="p-2 rounded me-2 d-inline-block"
      ></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button
        type="button"
        class="btn-close"
        @click="clearToast(key)"
        aria-label="Close"
      ></button>
    </div>

   
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>

</div>

</template>

<script>
export default {
  data() {
    return {
      message: [],
    };
  },
  inject:['emitter'],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.message.shift();
      }, 4000);
    },
  },
  mounted() {
    this.emitter.on("push-message", (message) => {
      const { style = "success", title, content } = message;
      this.message.push({ style, title, content });
      this.toastShow();
    });
  },
};
</script>