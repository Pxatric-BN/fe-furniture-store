<template>
  <div class="sidebar">
    <div class="sidebar-title">
      Categories
    </div>

    <v-text-field
      placeholder="Search for Colour"
      class="search-field"
      solo
      flat
      dense
      hide-details
      background-color="#f2f2f2"
    />

    <div class="category-list">
      <label
        v-for="category in categories"
        :key="category.name"
        class="category-item"
      >
        <v-checkbox
          class="category-checkbox"
          hide-details
          dense
        />
        <span class="category-label">
          {{ category.name }} ({{ category.count }})
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
      categories: [
        { name: 'Bedroom', count: 8 },
        { name: 'Dining Room', count: 8 },
        { name: 'Living Room', count: 8 },
        { name: 'Office', count: 8 },
        { name: 'Outdoor', count: 10 },
        { name: 'Storage', count: 8 }
      ]
    }
  }
}
</script>

<style scoped>
.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

.search-field {
  border-radius: 8px;
  margin-bottom: 16px;
}

.category-list {
  display: flex;
  flex-direction: column;
}

.category-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px 4px;
  cursor: pointer;
}

.category-item:last-child {
  border-bottom: none;
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

.category-label {
  font-size: 15px;
  color: #333;
}
</style>