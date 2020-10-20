export const state = () => ({
  categories: [],
  booksList: [],
  currentPage: null,
  categoryHasNotBeenUpdated: true,
})

export const actions = {
  async fetchCategoriesBooks({ commit }) {
    try {
      const { data } = await this.$axios.$post('/book/categories')
      commit('setCategories', data.list)
    } catch (e) {
      throw new Error(`${e.message} while loading categories`)
    }
  },
  async fetchBooks({ commit }, queryParams) {
    try {
      const { data } = await this.$axios.$post('/book/list', queryParams)
      commit('setCurrentPage', data)
      commit('setBooksList', data.list)
    } catch (e) {
      throw new Error(`${e.message} while loading books list`)
    }
  },
}

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
  setBooksList(state, newBooksList) {
    state.booksList = state.categoryHasNotBeenUpdated
      ? [...state.booksList, ...newBooksList]
      : newBooksList
    state.categoryHasNotBeenUpdated = true
  },
  setCurrentPage(state, page) {
    state.currentPage = page
  },
  setCategoryUpdateStatus(state, status) {
    state.categoryHasNotBeenUpdated = status
  },
}

export const getters = {
  categories: (state) => state.categories,
  booksList: (state) => state.booksList,
  allCategoriesIds: (state) => state.categories.map((cat) => cat.id),
  currentPage: (state) => state.currentPage,
}
