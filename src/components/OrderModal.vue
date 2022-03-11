<template>
  <div
    id="orderModal"
    ref="orderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header btn-primary">
          <h5 id="orderModalLabel" class="modal-title">訂單檢視</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 mb-3">
              <h2>訂購人資訊</h2>
              <!-- 如果tempOder裡面有資料 -->
              <template v-if="tempOder.user">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">訂單時間</th>
                      <th scope="col">姓名</th>
                      <th scope="col">電話</th>
                      <th scope="col">Eamil</th>
                      <th scope="col">住址</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th>{{ getDate(tempOder.create_at) }}</th>
                      <th>{{ tempOder.user.name }}</th>
                      <td>{{ tempOder.user.tel }}</td>
                      <td>{{ tempOder.user.email }}</td>
                      <td>{{ tempOder.user.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </div>

            <div class="col-12">
              <h2>訂購資訊</h2>
              <table class="table table-striped table-hover">
                <caption class="text-end">
                  合計：{{
                    tempOder.total
                  }}
                </caption>

                <tbody>
                  <tr v-for="item in tempOder.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td>單價：{{ item.product.price }}</td>
                    <td class="text-end">總價：{{ item.final_total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-end mt-2 mb-2">
              <div class="form-check check-style">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  v-model="tempOder.is_paid"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  <span v-if="tempOder.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="updateOrder(tempOder)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
  `
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
export default {
  props: ["order"],
  emits: ["get-data"],
  inject: ["emitter"],
  data() {
    return {
      modal: "",
      tempOder: {},
      is_paid: false,
    };
  },
  watch: {
    order() {
      this.tempOder = JSON.parse(JSON.stringify(this.order)); // 因為單向數據流的關係，所以要用深拷貝另外一個物件來存資料
    },
  },
  methods: {
    getDate(time) {
      //時間處理
      const date = new Date(time * 1000);
      return date.toLocaleDateString();
    },
    updateOrder(tempOder) {
      let url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/order/${tempOder.id}`;
      this.$http
        .put(url, { data: this.tempOder })
        .then((res) => {
          this.emitter.emit("push-message", {
            style: "success",
            title: "已更新",
            content: res.data.message,
          });
          //傳外層
          this.$emit("get-data");
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.orderModal, {
      keyboard: false,
      backdrop: "static",
    });
  },
};
</script>

<style lang="scss">
.check-style {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>