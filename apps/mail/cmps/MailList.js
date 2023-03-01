import mailPreview from './mailPreview.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul class="grid">
                <li v-for="email in emails" :key="email.id" class="clean-list" :to="'/email/'+email.id">
                    <mailPreview :email="email" @remove="removeEmail"/>
                    <!-- <RouterLink :to="'/email/'+email.id">Details</RouterLink> | -->
                </li>
            </ul>
        </section>
    `,
    methods: {
        removeEmail(emailId) {
            this.$emit('remove', emailId)
        },
    },
    components: {
        mailPreview,
    }
}