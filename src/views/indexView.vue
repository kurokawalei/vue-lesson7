<template>
  <div class="bg">
    <div class="main-info">
      <h1 class="h1">黑川玩具店</h1>
      <p>在這裡，年齡不是界限，快樂才是追求。</p>
      <p>只要走進來，都可以尋找到屬於你的快樂！</p>
      <router-link to="/products" class="btn-warning btn btn-lg">開始逛逛!</router-link>
    </div>
  </div>
</template>

<style lang="scss">
.bg {
  background: url(https://cdn.pixabay.com/photo/2016/03/26/22/22/happy-1281590_960_720.jpg);
  background-repeat: no-repeat;
  position: relative;
  background-size: cover;
  width: 100vw;
  height: calc(100vh - 72px);
  .main-info {
    position: absolute;
    right: 2vw;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
  }
}
</style>
