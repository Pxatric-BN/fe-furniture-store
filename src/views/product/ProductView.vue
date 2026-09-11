<template>
  <v-container fluid>
    <v-row>
     
      <v-col cols="3" class="d-flex justify-center"> 
        <ProductSideBar />
      </v-col>

    
      <v-col cols="9" class="d-flex justify-center">
        <ProductCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from '@/components/products/ProductCard.vue'
import ProductSideBar from '@/components/products/ProductSideBar.vue'

export default {
  components: {
    ProductCard,
    ProductSideBar
  }
}
</script>

<style scoped>

</style>