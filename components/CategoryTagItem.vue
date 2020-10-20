<template>
  <div
    class="category-tag-item"
    :class="{
      'category-tag-item__active': active,
    }"
    @click="$emit('select-category', category)"
  >
    {{ category.name }}
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>

<style scoped>
.category-tag-item {
  padding: 10px;
  border-radius: 20px;
  font-size: 16px;
  box-shadow: 0 0 10px #aaa;
  background-color: #FFFFF;
  cursor: pointer;
  transition: 0.4s;
}
.category-tag-item:hover {
  box-shadow: 0 0 20px #808080;
}
.category-tag-item__active {
  box-shadow: 0 0 10px #42aaff;
}
.category-tag-item__active:hover {
  box-shadow: 0 0 10px #42aaff;
}
</style>
