export default {
    props: ['email'],
    template: `
     
        <article class="email-preview">
            <p> 
                <RouterLink :to="'/email/'+email.id">
                    <span>{{email.from}}</span>  |
                    <span>{{shortContent}}</span>|
                    <span>{{email.sentAt}}</span>
                </RouterLink>
                    <button @click="remove(email.id)"><i class="fa-solid fa-trash-can"></i></button>
            </p>
            <!-- <pre>{{email}}</pre> -->
        </article>
    `,
    data() {
        return {
            content: this.email.subject + ' - ' + this.email.body
        }
    },
    methods: {
        remove(emailId) {
            this.$emit('remove', emailId)
        },
    },
    computed: {
        shortContent() {
            var wordArr = this.content.split(" ")
            var wordShort = wordArr.splice(0, 20).join(" ")
            return wordShort
        },
    }
}