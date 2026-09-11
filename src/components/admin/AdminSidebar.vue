<template>
  <v-navigation-drawer
    app
    width="240"
    color="white"
    class="admin-drawer"
  >
    <div class="sidebar-header">
      <div class="logo-mark">
        FS
      </div>

      <div class="header-text">
        <div class="logo">
          Furniture Store
        </div>
        <div class="admin-text">
          Admin Backoffice
        </div>
      </div>
    </div>

    <div class="nav-section">
      <div class="section-label">
        Overview
      </div>

      <v-list nav class="nav-list">
        <v-list-item
          to="/admin"
          exact
          class="nav-item"
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

    <div class="nav-section">
      <div class="section-label">
        Store
      </div>

      <v-list nav class="nav-list">
        <v-list-item
          to="/admin/products"
          class="nav-item"
        >
          <v-list-item-icon>
            <v-icon>mdi-package-variant-closed</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

    <v-list-group
     
      prepend-icon="mdi-cart-outline"
      no-action
      class="nav-item"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Orders</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item
        to="/admin/orders"
        exact
        class="sub-nav-item"
      >
        <v-list-item-icon>
          <v-icon small>
            mdi-format-list-bulleted
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            All Orders
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        to="/admin/orders/products-by-order"
        class="sub-nav-item"
      >
        <v-list-item-icon>
          <v-icon small>
            mdi-package-variant
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            Orders by products
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>

    <v-list-item
          to="/admin/users"
          class="nav-item"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-group-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

    <template v-slot:append>
      <div class="sidebar-footer">
        <v-btn
          block
          text
          class="logout-btn"
          @click="handleLogout"
        >
          <v-icon left size="18">
            mdi-logout
          </v-icon>
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { logout } from '@/utils/auth'

export default {
  name: 'AdminSidebar',

  methods: {
    handleLogout () {
      logout()

      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.admin-drawer :deep(.v-navigation-drawer__border) {
  display: none;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.logo-mark {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: #111;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-text {
  min-width: 0;
}

.logo {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-text {
  margin-top: 1px;
  font-size: 12px;
  color: #999;
}

.nav-section {
  padding: 16px 0 4px;
}

.section-label {
  padding: 0 24px;
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #b0b0b0;
}

.nav-list {
  padding: 0;
}

.nav-item {
  margin: 2px 12px;
  border-radius: 10px;
  min-height: 42px;
  color: #555;
}

.nav-item :deep(.v-list-item__icon) {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 12px;
}

.nav-item :deep(.v-icon) {
  color: #999;
  font-size: 20px;
}

.nav-item :deep(.v-list-item__title) {
  font-size: 14px;
  font-weight: 500;
}

.nav-item::before {
  border-radius: 10px;
}

.nav-item--active,
.v-list-item--active.nav-item {
  background-color: #111 !important;
  color: #fff !important;
}

.v-list-item--active.nav-item :deep(.v-icon) {
  color: #fff !important;
}

.v-list-item--active.nav-item :deep(.v-list-item__title) {
  color: #fff !important;
  font-weight: 600;
}

.v-list-item--active.nav-item::before {
  opacity: 0 !important;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #eee;
}

.logout-btn {
  justify-content: flex-start !important;
  color: #d32f2f !important;
  font-weight: 500;
  text-transform: none;
  letter-spacing: normal;
}
.sub-nav-item {
  margin: 2px 12px 2px 32px;
  border-radius: 10px;
  min-height: 42px;
  color: #555;
}

.sub-nav-item :deep(.v-list-item__icon) {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 12px;
}

.sub-nav-item :deep(.v-icon) {
  color: #999;
  font-size: 18px;
}

.sub-nav-item :deep(.v-list-item__title) {
  font-size: 13px;
  font-weight: 500;
}


.sub-nav-item::before {
  border-radius: 10px;
}

.sub-nav-item.v-list-item--active {
  background-color: #111 !important;
  color: #fff !important;
}

.sub-nav-item.v-list-item--active :deep(.v-icon) {
  color: #fff !important;
}

.sub-nav-item.v-list-item--active :deep(.v-list-item__title) {
  color: #fff !important;
  font-weight: 600;
}

.sub-nav-item.v-list-item--active::before {
  opacity: 0 !important;
}


</style>