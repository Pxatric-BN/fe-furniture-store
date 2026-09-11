<template>
  <v-app-bar
    app
    flat
    color="transparent"
    class="toolbar"
  >
    <img
      src="@/assets/logo.png"
      alt="Furniture Store"
      class="logo"
    />

    <v-spacer />

    <div class="toolbar-menu">
      <v-text-field 
      v-model="search" 
      placeholder="Search"
      prepend-inner-icon="mdi-magnify" 
      solo 
      flat
      dense
      hide-details 
      class="toolbar-search" />
      
      <v-btn
        icon
        class="toolbar-icon"
      >
        <v-icon>
          mdi-heart-outline
        </v-icon>
      </v-btn>

      
      <v-btn
        icon
        class="toolbar-icon"
      >
        <v-icon>
          mdi-cart-outline
        </v-icon>
      </v-btn>

      <v-btn
        icon
        class="toolbar-icon"
        @click="logout"
      >
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'ToolBar',
  data() { 
    return { 
        search: '' 
        } 
    },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('currentOrder')
      this.$router.push('/login')
    }
  }  
}

</script>

<style scoped>
.toolbar {
  background: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.logo {
  width: 120px;
  height: auto;
  object-fit: contain;
  cursor: pointer;
}

.toolbar-menu {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-icon {
  color: #555 !important;
  border-radius: 10px;
  transition: background-color 0.2s ease;
}

.toolbar-icon:hover {
  background: rgba(0, 0, 0, 0.04);
}
.toolbar-search { 
    max-width: 220px; 
    margin-right: 8px; 
    border-radius: 999px;
} 


</style>

