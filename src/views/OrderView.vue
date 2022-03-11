<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="text-center mt-3 mb-3"><h2>訂單資訊</h2></div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orderList" :key="key">
          <tr :class="{ 'table-active': item.is_paid }">
            <td>{{ item.id }}</td>
            <td>{{ getDate(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm me-2"
                  type="button"
                  @click="openorderModal('view', item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openorderModal('del', item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <pageinfo :pages="pageinfo" @changepage="getoderList"></pageinfo>
  </div>

  <orderModal
    ref="orderModal"
    :order="tempOrder"
    @get-data="getoderList"
  ></orderModal>

  <delModal
    ref="delOrder"
    :temp-Order="tempOrder"
    @get-data="getoderList"
  ></delModal>
</template>

<script>
import pageinfo from "@/components/pageView.vue";
import orderModal from "@/components/OrderModal.vue";
import delModal from "@/components/DelorderModal.vue";

export default {
  data() {
    return {
      orderList: {},
      isLoading: false,
      pageinfo: {},
      tempOrder: {},
      paidobj: {},
    };
  },
  inject:['emitter'],
  components: {
    pageinfo,
    delModal,
    orderModal,
  },
  methods: {
    getoderList(page = 1) {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
        )
        .then((res) => {
          this.orderList = res.data.orders;
          this.pageinfo = res.data.pagination;
          this.isLoading = false;
        })
        .catch((er) => {
          console.log(er);
        });
    },
    getDate(time) {
      //時間處理
      const date = new Date(time * 1000);
      return date.toLocaleDateString();
    },
    openorderModal(status, item) {
      if (status === "view") {
        this.tempOrder = { ...item };
        console.log(this.tempOrder);
        //this.isNew = true;
        this.$refs.orderModal.openModal();
      } else if (status === "del") {
        this.tempOrder = { ...item };
        console.log("d" + this.tempOrder);
        this.$refs.delOrder.openModal();
      }
    },

    updatePaid(item) {
      this.isLoading = true;
      //
      this.paidobj = {
        is_paid: item.is_paid,
      };

      let url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.$http
        .put(url, { data: this.paidobj })
        .then((res) => {
          this.emitter.emit("push-message", {
            style: "success",
            title: "已更新",
            content: res.data.message,
          });
          this.getoderList();
        })
        .catch((err) => {
          console.dir(err);
        });

      //this.getoderList();
    },
  },
  mounted() {
    this.getoderList();
  }

};
</script>

