<template>
  <div class="cart">
    <h1 class="title">
      Order
      <span>
        <span class="language">Total</span>
      </span>
    </h1>
    <ul class="items">
      <li :key="item.id" v-for="item in data.items" class="item">
        <div class="item-preview">
          <img :src="item.thumbnail" :alt="item.title" class="item-thumbnail">
          <div>
            <h2 class="item-title">{{ item.title }}</h2>
            <p class="item-description">{{ item.description }}</p>
          </div>
        </div>
        <div>
          <input type="text" class="item-quantity" v-model="item.quantity">
          <span
            class="item-price"
          >X ₹{{ toPrice(item.price).toFormat('₹0') }} &nbsp; = &nbsp; ₹{{toPrice(item.price).toFormat('₹0')*item.quantity}}</span>&emsp;
          <el-button type="danger" icon="el-icon-delete" circle v-on:click="deleteitem(item)"></el-button>
        </div>
      </li>
    </ul>
    <h3 class="cart-line">
      Subtotal
      <span class="cart-price">₹{{ getSubtotal.toFormat('₹0') }}</span>
    </h3>
    <h3 class="cart-line">
      GST ({{ data.vatRate }}%)
      <span class="cart-price">₹{{ getTaxAmount.toFormat('₹0') }}</span>
    </h3>
    <h3 class="cart-line"></h3>
    <h3 class="cart-line">
      Total
      <span class="cart-price cart-total">₹{{ getTotal.toFormat('₹0') }}</span>
    </h3>
    <br>
    <div>
      <center>
        <el-button type="primary" @click="handleclick()">Pay ₹{{getTotal.toFormat('₹0')}}</el-button>
      </center>
      <br>
      <br>
    </div>
  </div>
</template>
<script>
import Dinero from "dinero.js";
import json from "../static/products.json";
export default {
  name: "app",
  data() {
    return {
      data: {
        items: [],
        shippingPrice: 0,
        vatRate: 0
      },
      language: "hi-IN",
      pay: false
    };
  },
  methods: {
    toPrice(amount, factor = Math.pow(10, 2)) {
      return Dinero({
        amount: Math.round(amount * factor)
      }).setLocale(this.language);
    },
    deleteitem(item) {
      this.data.items.splice(this.data.items.indexOf(item), 1);
    },

    handleclick() {
      this.$router.push("/pay?price=" + this.getTotal.toFormat("₹0"));
    }
  },
  computed: {
    getShippingPrice() {
      return this.toPrice(this.data.shippingPrice);
    },
    getTaxAmount() {
      return this.getSubtotal.percentage(this.data.vatRate);
    },
    getSubtotal() {
      return this.data.items.reduce(
        (a, b) => a.add(this.toPrice(b.price).multiply(b.quantity)),
        Dinero().setLocale(this.language)
      );
    },
    getTotal() {
      return this.getSubtotal.add(this.getTaxAmount).add(this.getShippingPrice);
    }
  },
  created() {
    this.data = json;
  }
};
</script>

<style scoped>
body {
  margin: 0;
  background: #fdca40;
  padding: 30px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  text-transform: uppercase;
  font-size: 110%;
  font-weight: normal;
}

.language {
  margin: 0 2px;
  font-size: 60%;
  color: rgba(#333a45, 0.6);
  text-decoration: underline;
  cursor: pointer;
}

.items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cart {
  background: #fff;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  color: #333a45;
  border-radius: 3px;
  padding: 30px;
}
.cart-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
  font-size: inherit;
  font-weight: normal;
  color: rgba(51, 58, 69, 0.8);
}
.cart-price {
  color: #333a45;
}
.cart-total {
  font-size: 130%;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 2px solid rgba(51, 58, 69, 0.1);
}
.item-preview {
  display: flex;
  align-items: center;
}
.item-thumbnail {
  margin-right: 20px;
  border-radius: 3px;
}
.item-title {
  margin: 0 0 10px 0;
  font-size: inherit;
}
.item-description {
  margin: 0;
  color: rgba(51, 58, 69, 0.6);
}
.item-quantity {
  max-width: 30px;
  padding: 8px 10px;
  font-size: inherit;
  color: rgba(51, 58, 69, 0.8);
  border: 2px solid rgba(51, 58, 69, 0.1);
  border-radius: 3px;
  text-align: center;
}
.item-price {
  margin-left: 20px;
}
</style>
