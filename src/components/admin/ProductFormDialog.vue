<template>
  <v-dialog
    :value="value"
    max-width="600"
    @input="$emit('input', $event)"
  >
    <v-card class="form-card">
      <v-card-title class="form-title">
        {{ isEdit ? 'Edit Product' : 'Add Product' }}
      </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="form.product_name"
            label="Product Name"
            outlined
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="form.product_description"
            label="Product Description"
            outlined
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="form.product_price"
            label="Price"
            type="number"
            prefix="฿"
            outlined
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="form.product_stock"
            label="Stock"
            type="number"
            outlined
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="form.product_category"
            label="Product Category"
            outlined
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="form.product_image"
            label="Image URL"
            outlined
            :rules="[rules.required]"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="form-actions">
        <v-spacer />

        <v-btn
          text
          @click="closeDialog"
        >
          Cancel
        </v-btn>

        <v-btn
          color="black"
          dark
          :loading="loading"
          @click="saveProduct"
        >
          {{ isEdit ? 'Update' : 'Create' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import eventBus from '@/utils/eventBus'

export default {
  name: 'ProductFormDialog',

  props: {
    value: {
      type: Boolean,
      default: false
    },

    product: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      valid: false,
      loading: false,

      form: {
        product_name: '',
        product_description: '',
        product_price: '',
        product_stock: '',
        product_category: '',
        product_image: ''
      },

      rules: {
        required: value => !!value || 'This field is required'
      }
    }
  },

  computed: {
    isEdit () {
      return !!this.product
    }
  },

  watch: {
    value (newValue) {
      if (newValue) {
        this.setForm()
      }
    }
  },

  methods: {
    setForm () {
      if (this.product) {
        this.form = {
          product_name: this.product.product_name,
          product_description: this.product.product_description,
          product_price: this.product.product_price,
          product_stock: this.product.product_stock,
          product_category: this.product.product_category,
          product_image: this.product.product_image
        }
      } else {
        this.form = {
          product_name: '',
          product_description: '',  
          product_price: '',
          product_stock: '',
          product_category: '',
          product_image: ''
        }
      }

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    },

    closeDialog () {
      this.$emit('input', false)
    },

    async saveProduct () {
      const result = this.$refs.form.validate()

      if (!result) return

      this.loading = true

      try {
        const token = localStorage.getItem('token')
        if (this.isEdit) {
         
          const response = await this.axios.put(
            `http://localhost:3000/api/v1/products/${this.product._id}`,
            this.form,
            {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
          )
          eventBus.$emit('show-alert', { type: 'success', message: response.data.message })
        } else {
          
          const response = await this.axios.post(
            'http://localhost:3000/api/v1/products',
            this.form,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          eventBus.$emit('show-alert', { type: 'success', message: response.data.message })
        }

        this.$emit('saved')
        this.$emit('input', false)
      } catch (error) {
        eventBus.$emit('show-alert', { 
            type: 'error', 
            message: error.response?.data?.message || 'Something went wrong' 
          })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.form-card {
  border-radius: 18px;
}

.form-title {
  font-size: 20px;
  font-weight: 700;
  padding: 24px 24px 12px;
}

.image-section {
  margin-top: 4px;
}

.image-label {
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

.image-preview {
  border-radius: 12px;
  border: 1px solid #eee;
}

.form-actions {
  padding: 8px 24px 20px;
}
</style>
