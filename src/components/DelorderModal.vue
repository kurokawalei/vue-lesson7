<template>
  <div
    id="delOrder"
    ref="delOrder"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delOrderLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delOrderLabel" class="modal-title">
            <span>刪除訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>是否刪除<strong class="text-danger me-2 ms-2">{{ tempOrder.id }}</strong>訂單<br>(刪除後將無法恢復)。</p>
          <p>訂購時間： {{ getDate(tempOrder.create_at) }}</p>
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
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="delOrder"
          >
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
  props: ["tempOrder"],
  inject:['emitter'],
  data() {
    return {
      modal: "",
    };
  },
  methods: {
    delOrder() {
      //刪除產品 
      //按下去的動作
      this.$http
        .delete(  
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
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
     getDate(time) {
      //時間處理
      const date = new Date(time * 1000);
      return date.toLocaleDateString();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.delOrder);
  },
};
</script>
