<template>
  <v-btn
    class="add-to-cart-btn"
    block
    depressed
    @click="$emit('click')"
  >
    <v-icon size="20" class="mr-2">mdi-heart</v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: 'AddProductButton',

  props: {
    label: {
      type: String,
      default: 'Add to cart'
    }
  }
}
</script>

<style scoped>
.add-to-cart-btn {
  margin-top: auto;
  padding-top: 16px;
  background-color: #0058a3 !important;
  color: #fff !important;
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  height: 44px !important;
}
</style>