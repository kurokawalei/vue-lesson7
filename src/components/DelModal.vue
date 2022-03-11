<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ item.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ item.title }}</strong>
          (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  props: ["item"],
  inject:['emitter'],
  data() {
    return {
      modal: "",
    };
  },
  methods: {
    delProduct() {
      //刪除產品 
      //按下去的動作
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.item.id}`
        )
        .then((res) => {
      
            this.emitter.emit("push-message", {
            style: "success",
            title: "已更新",
            content: res.data.message,
          });
          

          //更新渲染
          this.$emit("get-data");
  
          //關閉刪除產品的modal
          this.modal.hide();
        })
        .catch((er) => {
          alert(er.data.message);
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
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
