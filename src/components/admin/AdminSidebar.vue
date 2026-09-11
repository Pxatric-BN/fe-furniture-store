<template>
  <v-navigation-drawer
    app
    width="250"
    color="white"
    class="admin-drawer"
  >

    <div class="sidebar-brand">
      <div class="brand-logo">
        FS
      </div>

      <div class="brand-info">
        <div class="brand-name">
          Furniture Store
        </div>

        <div class="brand-role">
          Admin Backoffice
        </div>
      </div>
    </div>

    <div class="sidebar-content">

      <div class="nav-section">
        <div class="section-label">
          Overview
        </div>

        <v-list
          nav
          class="nav-list"
        >
          <v-list-item
            to="/admin"
            exact
            class="nav-item"
          >
            <v-list-item-icon>
              <v-icon>
                mdi-view-dashboard-outline
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                Dashboard
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <div class="nav-section">
        <div class="section-label">
          Store
        </div>

        <v-list
          nav
          class="nav-list"
        >

          <v-list-item
            to="/admin/products"
            class="nav-item"
          >
            <v-list-item-icon>
              <v-icon>
                mdi-package-variant-closed
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                Products
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            prepend-icon="mdi-cart-outline"
            no-action
            class="nav-group"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  Orders
                </v-list-item-title>
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
              <v-icon>
                mdi-account-group-outline
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                Users
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </div>

    </div>

    <template v-slot:append>
      <div class="sidebar-footer">

        <v-btn
          block
          text
          class="logout-btn"
          @click="handleLogout"
        >
          <v-icon
            left
            size="19"
          >
            mdi-logout-variant
          </v-icon>

          <span>Logout</span>
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

/* =========================
   Sidebar
========================= */

.admin-drawer {
  border-right: 1px solid #eeeeee !important;
}

.admin-drawer :deep(.v-navigation-drawer__border) {
  display: none;
}

.sidebar-brand {
  height: 76px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  border-bottom: 1px solid #eeeeee;
}

.brand-logo {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #111111;
  color: #ffffff;

  border-radius: 11px;

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;

  flex-shrink: 0;
}

.brand-info {
  min-width: 0;
}

.brand-name {
  font-size: 14px;
  font-weight: 700;
  color: #171717;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brand-role {
  margin-top: 3px;

  font-size: 11px;
  color: #999999;

  white-space: nowrap;
}

.sidebar-content {
  padding-top: 8px;
}

.nav-section {
  padding: 12px 0;
}

.section-label {
  padding: 0 20px;
  margin-bottom: 7px;

  font-size: 10px;
  font-weight: 700;

  color: #aaaaaa;

  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.nav-list {
  padding: 0 10px;
}

/* =========================
   Main Navigation
========================= */

.nav-item {
  position: relative;

  min-height: 44px;

  margin: 3px 0;

  border-radius: 10px;

  color: #555555;
}

.nav-item :deep(.v-list-item__icon) {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 13px;
}

.nav-item :deep(.v-icon) {
  color: #999999;
  font-size: 20px;
}

.nav-item :deep(.v-list-item__title) {
  font-size: 13px;
  font-weight: 500;
}


.nav-item:hover {
  background: #f7f7f7;
}

.nav-item.v-list-item--active {
  background: #111111 !important;
  color: #ffffff !important;
}

.nav-item.v-list-item--active::before {
  display: none;
}

.nav-item.v-list-item--active :deep(.v-icon) {
  color: #ffffff !important;
}

.nav-item.v-list-item--active :deep(.v-list-item__title) {
  color: #ffffff !important;
  font-weight: 600;
}

.nav-group {
  margin: 3px 0;
  border-radius: 10px;
  color: #555555;
}

.nav-group :deep(.v-list-item) {
  min-height: 44px;
  border-radius: 10px;
}

.nav-group :deep(.v-list-item__icon) {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 13px;
}

.nav-group :deep(.v-icon) {
  color: #999999;
  font-size: 20px;
}

.nav-group :deep(.v-list-item__title) {
  font-size: 13px;
  font-weight: 500;
}

/* Group hover */

.nav-group :deep(.v-list-item:hover) {
  background: #f7f7f7;
}

/* =========================
   Sub Navigation
========================= */

.sub-nav-item {
  min-height: 40px;

  margin: 2px 0 2px 20px;

  border-radius: 9px;

  color: #666666;
}

.sub-nav-item :deep(.v-list-item__icon) {
  margin-top: 9px;
  margin-bottom: 9px;
  margin-right: 10px;
}

.sub-nav-item :deep(.v-icon) {
  color: #aaaaaa;
  font-size: 17px;
}

.sub-nav-item :deep(.v-list-item__title) {
  font-size: 12px;
  font-weight: 500;
}

.sub-nav-item:hover {
  background: #f7f7f7;
}


.sub-nav-item.v-list-item--active {
  background: #f1f1f1 !important;
  color: #111111 !important;
}

.sub-nav-item.v-list-item--active::before {
  display: none;
}

.sub-nav-item.v-list-item--active :deep(.v-icon) {
  color: #111111 !important;
}

.sub-nav-item.v-list-item--active :deep(.v-list-item__title) {
  color: #111111 !important;
  font-weight: 600;
}

.sidebar-footer {
  padding: 14px;
  border-top: 1px solid #eeeeee;
}

.logout-btn {
  height: 42px !important;

  justify-content: flex-start !important;

  padding-left: 12px !important;

  border-radius: 10px;

  color: #d32f2f !important;

  font-size: 13px;
  font-weight: 500;

  text-transform: none;
  letter-spacing: normal;
}

.logout-btn:hover {
  background: #fff5f5 !important;
}

</style>

