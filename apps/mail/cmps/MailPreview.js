import { eventBus } from "../../../services/event-bus.service.js"
import { emailService } from "../services/mail.service.js"

export default {
    props: ['email'],
    template: `
     
        <article class="email-preview">
                <RouterLink :to="'/email/'+email.id" @click="setHomeFalse(); setRead();" >
                    <span>{{email.from}}</span>  |
                    <span>{{shortContent}}</span>|
                    <span>{{email.sentAt}}</span>
                </RouterLink>
                    <!-- <button @click="remove(email.id)"><i class="fa-solid fa-trash-can"></i></button> -->
            <!-- <pre>{{email}}</pre> -->
        </article>
    `,
    data() {
        return {
            content: this.email.subject + ' - ' + this.email.body,
        }
    },
    methods: {
        remove(emailId) {
            this.$emit('remove', emailId)
        },
        setHomeFalse() {
            // console.log('hi');
            eventBus.emit('leave inbox')
        },
        setRead() {
            if (this.email.isRead === false) {
                this.email.isRead = true
                emailService.save(this.email)
            }
        }
    },
    computed: {
        shortContent() {
            var wordArr = this.content.split(" ")
            var wordShort = wordArr.splice(0, 15).join(" ")
            return wordShort
        },
    },
    components: {
        emailService,
    }
}