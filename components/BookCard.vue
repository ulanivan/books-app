<template>
  <div class="book">
    <div class="book_cover">
      <img :src="book.image" />
    </div>
    <div class="book_description">
      <p class="book_description__book-name">{{ book.name }}</p>
      <p class="book_description__author">Автор: {{ book.author }}</p>
      <p class="book_description__description">{{ book.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.book {
  box-shadow: 0 0 20px #aaa;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 1fr 4fr;
  padding: 10px;
}
.book_cover {
  border: 2px solid gray;
}
.book_cover img {
  width: 100%;
  height: 100%;
}
.book_description {
  padding-left: 1rem;
}
.book_description p {
  text-align: left;
}
.book_description__book-name {
  font-size: 4vw;
  text-align: start;
}
.book_description__author {
  margin-top: 12px;
  font-size: 18px;
}
.book_description__description {
  font-size: 14px;
  height: 145px;
  overflow: hidden;
  margin-top: 12px;
}
@media (max-width: 575px) {
  .book {
    grid-template-columns: 3fr 4fr;
  }
}
</style>
