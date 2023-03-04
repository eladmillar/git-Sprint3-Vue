export default {
    template: `
        <section class="email-filter">
                <form class="search-field">
                    <input v-model="filterBy.txt"
                        placeholder="Search" type="text" >
                        <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
        </section>
    `,
    data() {
        return {
            filterBy: { txt: '' },
        }
    },
    watch: {
        filterBy: {
            handler() {
                // console.log('filterBy changed', this.filterBy)
                this.$emit('filter', this.filterBy)
            },
            deep: true
        },
    }
}