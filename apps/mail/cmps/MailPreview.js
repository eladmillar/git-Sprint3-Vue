import { eventBus } from "../../../services/event-bus.service.js"
import { emailService } from "../services/mail.service.js"

export default {
    props: ['email'],
    template: `
     
        <article class="email-preview">
                <RouterLink :to="'/email/'+email.id" @click="setHomeFalse(); setRead();" >
                    <p class="flex justify-between">
                            <span>{{email.from}} | {{shortContent}}</span>
                            <span>{{email.sentAt}}</span>
                    </p>
                </RouterLink>
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