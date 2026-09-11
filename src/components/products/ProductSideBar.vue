<template>
  <div class="sidebar">

    <div class="sidebar-header">
      <div class="sidebar-title">
        Categories
      </div>

      <div class="sidebar-subtitle">
        Filter by category
      </div>
    </div>

    <v-text-field
      v-model="search"
      placeholder="Search category..."
      class="search-field"
      solo
      flat
      dense
      hide-details
      background-color="white"
      prepend-inner-icon="mdi-magnify"
    />

    
    <div class="category-list">
      <label
        v-for="category in filteredCategories"
        :key="category.name"
        class="category-item"
        :class="{ active: selectedCategories.includes(category.name) }"
      >
        <v-checkbox
          v-model="selectedCategories"
          :value="category.name"
          class="category-checkbox"
          hide-details
          dense
          color="black"
        />

        <span class="category-label">
          {{ category.name }}
        </span>

        <span class="category-count">
          {{ category.count }}
        </span>
      </label>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProductSideBar',

  data () {
    return {
      search: '',

      selectedCategories: [],

      categories: [
        { name: 'Bedroom', count: 8 },
        { name: 'Dining Room', count: 8 },
        { name: 'Living Room', count: 8 },
        { name: 'Office', count: 8 },
        { name: 'Outdoor', count: 10 },
        { name: 'Storage', count: 8 }
      ]
    }
  },

  computed: {
    filteredCategories () {
      return this.categories.filter(category =>
        category.name
          .toLowerCase()
          .includes(this.search.toLowerCase())
      )
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 100%;
}

.sidebar-header {
  margin-bottom: 16px;
}

.sidebar-title {
  font-size: 19px;
  font-weight: 700;
  color: #171717;
}

.sidebar-subtitle {
  margin-top: 4px;
  font-size: 12px;
  color: #999999;
}

.search-field {
  margin-bottom: 14px;
  border-radius: 10px;
}

.search-field :deep(.v-input__slot) {
  min-height: 42px !important;
  padding: 0 12px !important;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
}

.search-field :deep(.v-input__prepend-inner) {
  margin-top: 10px;
}

.search-field :deep(.v-icon) {
  color: #999999;
  font-size: 19px;
}

.search-field :deep(input) {
  font-size: 13px;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-item {
  display: flex;
  align-items: center;

  min-height: 52px;
  padding: 0 12px;

  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 10px;

  cursor: pointer;

  transition: all 0.2s ease;
}

.category-item:hover {
  border-color: #d5d5d5;
  transform: translateY(-1px);
}

.category-item.active {
  border-color: #111111;
  background: #fafafa;
}

.category-checkbox {
  margin: 0;
  padding: 0;
  flex-shrink: 0;
}

.category-checkbox :deep(.v-input__slot) {
  margin-bottom: 0;
}

.category-checkbox :deep(.v-messages) {
  display: none;
}

.category-checkbox :deep(.v-icon) {
  font-size: 20px;
}

.category-label {
  flex: 1;
  margin-left: 5px;

  font-size: 14px;
  font-weight: 500;
  color: #333333;
}

.category-count {
  min-width: 28px;
  height: 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 7px;

  background: #f3f3f3;
  border-radius: 6px;

  font-size: 11px;
  font-weight: 600;
  color: #888888;
}
</style>