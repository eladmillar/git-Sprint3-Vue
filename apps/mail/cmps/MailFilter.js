export default {
    template: `
        <section class="email-filter">
                <form>
                    <input v-model="filterBy.txt"
                        placeholder="Search" type="text" >
                </form>
        </section>
    `,
    data() {
        return {
            filterBy: { txt: '' },
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    },
    watch: {
        filterBy: {
            handler() {
                console.log('filterBy changed', this.filterBy)
                this.$emit('filter', this.filterBy)
            },
            deep: true
        },
    }
}