<template>
  <li>
    <a class="dropdown-item" href="#">{{
      category.charAt(0).toUpperCase() + category.slice(1)
    }}</a>
  </li>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
    },
  },
};
</script>
