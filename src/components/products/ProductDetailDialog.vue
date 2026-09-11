<template>
  <v-dialog
    :value="value"
    max-width="700"
    @input="$emit('input', $event)"
  >
    <v-card
      outlined
      class="product-detail-card"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-2">
            PRODUCT DETAIL
          </div>

          <v-list-item-title class="text-h5 mb-2">
            {{ product.product_name }}
          </v-list-item-title>

          <v-list-item-subtitle class="description">
            {{ product.product_description }}
          </v-list-item-subtitle>

          <div class="price">
            ฿{{ product.product_price }}
          </div>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="180"
          class="product-avatar"
        >
          <img
            :src="product.product_image"
            :alt="product.product_name"
          >
        </v-list-item-avatar>
      </v-list-item>

      <v-divider />

      <v-card-actions class="card-actions">
        <div class="quantity">
          <span>Quantity</span>

          <div class="quantity-control">
            <v-btn
              icon
              small
              @click="decreaseQuantity"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>

            <span class="quantity-number">
              {{ quantity }}
            </span>

            <v-btn
              icon
              small
              @click="increaseQuantity"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </div>

        <v-spacer />

        <v-btn
          outlined
          rounded
          text
          @click="addToOrder"
        >
          ADD TO ORDER
        </v-btn>

        <v-btn
          icon
          @click="closeDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ProductDetailDialog',

  props: {
    value: {
      type: Boolean,
      default: false
    },

    productId: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      product: {},
      quantity: 1
    }
  },

  watch: {
    value (newValue) {
      if (newValue && this.productId) {
        this.getProduct()
      }
    }
  },

  methods: {
    async getProduct () {
      try {
        const response = await this.axios.get(
          `http://127.0.0.1:3000/api/v1/products/${this.productId}`
        )

        this.product = response.data.data
        this.quantity = 1
      } catch (error) {
        console.error('Get product failed:', error)
      }
    },

    increaseQuantity () {
      this.quantity++
    },

    decreaseQuantity () {
      if (this.quantity > 1) {
        this.quantity--
      }
    },

    addToOrder () {
      this.$emit('add-to-order', {
        product: this.product,
        quantity: this.quantity
      })
    },

    closeDialog () {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped>
.product-detail-card {
  border-radius: 18px;
  overflow: hidden;
}

.product-avatar {
  border-radius: 12px !important;
  overflow: hidden;
}

.product-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.description {
  max-width: 380px;
  line-height: 1.5;
}

.price {
  margin-top: 14px;
  font-size: 20px;
  font-weight: 700;
  color: #000;
}

.card-actions {
  padding: 16px 20px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  height: 38px;
}

.quantity-number {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}
</style>