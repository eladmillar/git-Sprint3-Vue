export default {
    props: ['unread'],
    template: `
        <section class="email-folder-list">

                        <button @click="viewInbox">Inbox</button>
                        <button @click="viewUnread">Unread ({{unread}})</button>
                        <button @click="viewSent">Sent</button>
        </section>
    `,
    data() {
        return {
            filterBy: { folder: '' }
        }
    },
    methods: {
        viewInbox() {
            this.$emit('inbox')
        },
        viewUnread() {
            this.$emit('unread')
        },
        viewSent() {
            this.$emit('sent')
        },
    }
}
