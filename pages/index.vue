<template>
  <div class="container">
    <h1 class="title">Books App</h1>
    <CategoriesTagsList>
      <CategoryTagItem
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :active="selectedCategories.includes(category.id)"
        @select-category="selectCategory"
      />
    </CategoriesTagsList>
    <BooksList>
      <BookCard v-for="book in booksList" :key="book.id" :book="book" />
    </BooksList>
    <button
      v-if="currentPage.next"
      class="pagination-btn"
      @click.prevent="showMore"
    >
      Показать ещё
    </button>
  </div>
</template>

<script>
import BooksList from '@/components/BooksList'
import CategoriesTagsList from '@/components/CategoriesTagsList'
import CategoryTagItem from '@/components/CategoryTagItem'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    BooksList,
    CategoriesTagsList,
    CategoryTagItem,
  },
  async asyncData({ route, store }) {
    const parseUrlCategories = (str) => str.split('_').map((id) => Number(id))
    const allCategoriesIds = store.getters['books/allCategoriesIds']

    const selectedCategories = route.query.categories
      ? parseUrlCategories(route.query.categories)
      : []
    const page = route.query.page ? route.query.page : 1
    const params = {
      categories: route.query.categories
        ? selectedCategories
        : allCategoriesIds,
      page,
    }
    await store.dispatch('books/fetchBooks', params)
    return {
      selectedCategories,
    }
  },
  computed: {
    ...mapGetters({
      books: 'books/booksList',
      categories: 'books/categories',
      booksList: 'books/booksList',
      currentPage: 'books/currentPage',
      allCategoriesIds: 'books/allCategoriesIds',
    }),
  },
  methods: {
    ...mapActions({
      fetchBooks: 'books/fetchBooks',
    }),
    ...mapMutations({
      setCategoryUpdateStatus: 'books/setCategoryUpdateStatus',
      searchBooks: 'books/searchBooks',
    }),
    selectCategory(category) {
      if (this.selectedCategories.includes(category.id)) {
        this.selectedCategories = this.selectedCategories.filter(
          (catId) => catId !== category.id
        )
      } else {
        this.selectedCategories = [...this.selectedCategories, category.id]
      }
      this.setCategoryUpdateStatus(false)
      this.updateProducts(this.getQuery())
    },
    showMore() {
      const nextPage = true
      this.updateProducts(this.getQuery(nextPage))
    },
    parapmsPush(params) {
      const { path, query } = params
      this.$router.push({
        path,
        query: {
          categories: query.categories.join('_'),
          page: query.page,
        },
      })
    },
    getQuery(nextPage = false) {
      const currentPage = this.$route.query.page ? this.$route.query.page : 1
      const nextPageCount = Number(currentPage) + 1
      const page = nextPage ? nextPageCount : 1
      const searchCategories =
        this.selectedCategories.length > 0
          ? this.selectedCategories
          : this.allCategoriesIds
      const query = {
        page,
        categories: searchCategories,
      }
      return query
    },
    updateProducts(query, path = '/') {
      const params = {
        path,
        query,
      }
      this.fetchBooks(query)
      this.parapmsPush(params)
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80vw;
  padding-bottom: 1rem;
}
.category-tag-item {
  margin-right: 15px;
  margin-bottom: 10px;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.books-list {
  margin-top: 2em;
}
.book {
  margin-bottom: 20px;
}
.categories-tags-list {
  margin-top: 2em;
}
.pagination-btn {
  width: 100%;
  background-color: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  padding: 1rem;
  font-size: 28px;
  transition: 0.4s;
  border: none;
  box-shadow: 0 0 10px #35495e;
}
.pagination-btn:hover {
  box-shadow: 0 0 10px #42aaff;
}
@media (max-width: 991px) {
  .container {
    width: 100wv;
  }
}
</style>
