export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('books/fetchCategoriesBooks')
    // await dispatch('books/fetchBooks', {
    //   categories: [10031],
    //   page: 1,
    // })
  },
}
