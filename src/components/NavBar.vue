<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark pt-3 pb-3">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <router-link class="nav-link navbar-brand" to="/">黑川玩具店</router-link>
      <div
        class="collapse navbar-collapse position-relative"
        id="navbarTogglerDemo03"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/car">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">後台</router-link>
          </li>
        </ul>

        <div class="position-absolute cart-box">
          <a class="btn-primary position-relative">
          
            <i class="bi bi-cart"></i>
              結帳
            <span
              class="
                position-absolute
                top-0
                start-100
                translate-middle
                badge
                rounded-pill
                bg-danger
              "
            >
              {{ cartData.carts.length }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from "@/libs/mitter.js";

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
    };
  },
  methods: {
    getCarList() {
      this.$http(
        `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
      )
        .then((res) => {
          this.cartData = res.data.data;
          emitter.emit("get-cart");
        })
        .catch((er) => {
          console.log(er);
        });
    },
  },
  mounted() {
    this.getCarList();
    emitter.on("get-cart", () => {
      this.getCarList();
    });
  },
};
</script>

<style lang="scss">
.carticon i {
  color: #fff;
  font-size: 1.2rem;
  &:hover {
    color: #fff;
  }
}
.cart-box {
  top: 50%;
  transform: translateY(-50%);
  right: 25px;
  a {
    padding: 4px 8px;
    text-decoration: none;
  }
}
</style>
