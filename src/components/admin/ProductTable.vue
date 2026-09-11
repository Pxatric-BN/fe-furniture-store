<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Products</h1>
        <p>Manage products</p>
      </div>

      <v-btn
        color="black"
        dark
        @click="openCreate"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Add Product
      </v-btn>
    </div>
    <v-card
      flat
      class="product-card"
    >
      <v-simple-table class="product-table">
        <thead>
          <tr>
            <th class="id-column">
              #
            </th>

            <th>
              Product
            </th>

            <th>
              Price
            </th>

            <th>
              Stock
            </th>
            
            <th class="text-right action-column">
              Action
            </th>
          </tr>
        </thead>

        <tbody v-if="!loading">
          <tr
            v-for="(product, index) in products"
            :key="product._id"
          >
            <!-- ID -->
            <td class="product-index">
              {{ index + 1 }}
            </td>

            <!-- Product -->
            <td>
              <div class="product-cell">
                <div>
                  <div class="product-name">
                    {{ product.product_name }}
                  </div>

                  <div class="product-id">
                    ID: {{ product._id }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Price -->
            <td>
              <span class="product-price">
                ฿{{ product.product_price }}
              </span>
            </td>

            <!-- Stock -->
            <td>
              <span class="product-stock">
                {{ product.product_stock }}
              </span>
            </td>

            <!-- Action -->
            <td class="text-right">
              <v-btn
                icon
                small
                class="action-btn"
                @click="editProduct(product)"
              >
                <v-icon size="18">
                  mdi-pencil-outline
                </v-icon>
              </v-btn>

              <v-btn
                icon
                small
                class="action-btn"
                @click="confirmDelete(product)"
              >
                <v-icon
                  size="18"
                  color="#d32f2f"
                >
                  mdi-delete-outline
                </v-icon>
              </v-btn>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="!products.length">
            <td
              colspan="5    "
              class="empty-state"
            >
              No products found
            </td>
          </tr>
        </tbody>
      </v-simple-table>

      <!-- Loading -->
      <div
        v-if="loading"
        class="loading-state"
      >
        <v-progress-circular
          indeterminate
          color="black"
          size="28"
        />
      </div>
    </v-card>

    <!-- Delete Dialog -->
    <v-dialog
      v-model="deleteDialog"
      max-width="360"
    >
      <v-card>
        <v-card-title class="dialog-title">
          Delete product?
        </v-card-title>

        <v-card-text>
          This will remove
          <strong>
            {{ productToDelete && productToDelete.product_name }}
          </strong>
          from the store.
        </v-card-text>

        <v-card-actions class="dialog-actions">
          <v-spacer />

          <v-btn
            text
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="red"
            dark
            :loading="deleting"
            @click="deleteProduct"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ProductFormDialog
        v-model="productDialog"
        :product="selectedProduct"
        @saved="getProducts"
     />
  </div>
</template>

<script>
import ProductFormDialog from '@/components/admin/ProductFormDialog.vue'

export default {
  name: 'AdminProducts',

  components: {
    ProductFormDialog
  },

  data () {
    return {
      products: [],
      loading: false,
      productDialog: false,
      selectedProduct: null,
      deleting: false,
      deleteDialog: false,
      productToDelete: null
    }
  },

  mounted () {
    this.getProducts()
  },

  methods: {
    async getProducts () {
      this.loading = true

      try {
        const response = await this.axios.get(
          'http://localhost:3000/api/v1/products'
        )

        this.products = response.data.data
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    openCreate () {
      this.selectedProduct = null
      this.productDialog = true
    },

    editProduct (product) {
      this.selectedProduct = product
      this.productDialog = true
    },
    confirmDelete (product) {
      this.productToDelete = product
      this.deleteDialog = true
    },

    async deleteProduct () {
      if (!this.productToDelete) return

      this.deleting = true

      try {
        const token = localStorage.getItem('token')

        await this.axios.delete(
          `http://127.0.0.1:3000/api/v1/products/${this.productToDelete._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        this.products = this.products.filter(
          product => product._id !== this.productToDelete._id
        )
      } catch (error) {
        console.log(error)
      } finally {
        this.deleting = false
        this.deleteDialog = false
        this.productToDelete = null
      }
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.page-header p {
  margin: 4px 0 0;
  color: #777;
  font-size: 14px;
}

/* Table Card */
.product-card {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #ececec;
}

/* Table */
.product-table :deep(table) {
  width: 100%;
  border-collapse: collapse;
}

.product-table :deep(th) {
  height: 52px !important;
  padding: 0 20px !important;

  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;

  color: #999;
  background-color: #fafafa;

  border-bottom: 1px solid #ececec !important;
}

.product-table :deep(td) {
  height: 76px;
  padding: 12px 20px !important;

  border-bottom: 1px solid #f0f0f0 !important;
  vertical-align: middle;
}

.product-table :deep(tbody tr:last-child td) {
  border-bottom: none !important;
}

.product-table :deep(tbody tr:hover) {
  background-color: #fafafa;
}

/* Columns */
.id-column {
  width: 60px;
}

.action-column {
  width: 140px;
}

/* Product */
.product-cell {
  display: flex;
  align-items: center;
  gap: 14px;
}


.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #222;
}

.product-id {
  margin-top: 3px;
  font-size: 11px;
  color: #aaa;
}

/* Index */
.product-index {
  color: #999;
  font-size: 13px;
}

/* Price */
.product-price {
  font-size: 14px;
  font-weight: 600;
  color: #222;
}

/* Action */
.action-btn {
  margin-left: 4px;
}

/* Empty */
.empty-state {
  text-align: center;
  color: #999;
  padding: 48px 0 !important;
  font-size: 14px;
}

/* Loading */
.loading-state {
  display: flex;
  justify-content: center;
  padding: 48px 0;
}

/* Dialog */
.dialog-title {
  font-size: 16px;
  font-weight: 700;
}

.dialog-actions {
  padding: 8px 16px 16px;
}

</style>
