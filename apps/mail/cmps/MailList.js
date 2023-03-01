import MailPreview from './MailPreview.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <ul class="grid">
                <li v-for="mail in mails" :key="mail.id" class="clean-list">
                    <MailPreview :mail="mail"/>
                    <RouterLink :to="'/mail/'+mail.id">Details</RouterLink> |
                    <!-- <RouterLink :to="'/mail/edit/'+mail.id">Edit</RouterLink> | -->
                    <button @click="remove(mail.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(mailId) {
            this.$emit('remove', mailId)
        },
    },
    components: {
        MailPreview,
    }
}