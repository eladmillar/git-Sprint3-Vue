import { emailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section class="email-details" v-if="email">
            <h2>{{email.subject}}</h2>
            <p>{{ email.from }} | sent at: {{email.sentAt}} </p>
            <p>{{ email.to }}</p>
            <p>{{ email.body }}</p>
            <nav>
                <RouterLink :to="'/email/' + email.prevEmailId">Previous Email</RouterLink> |
                <RouterLink :to="'/email/' + email.nextEmailId">Next Email</RouterLink>
                <hr />
                <!-- <RouterLink to="/email">Back to Inbox</RouterLink> -->
                <button @click="inbox">Back to Inbox</button>
            </nav>

            <hr />
            <!-- <pre>{{email}}</pre>     -->
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    created() {
        // console.log('EmailDetails Params:', this.$route.params)
        this.loadEmail()
    },
    computed: {
        emailId() {
            return this.$route.params.emailId
        }
    },
    watch: {
        emailId() {
            this.loadEmail()
        }
    },
    methods: {
        loadEmail() {
            emailService.get(this.emailId)
                .then(email => this.email = email)
                .catch(error => error)
        },
        inbox() {
            console.log('hi')
            eventBus.emit('go to inbox')
        }
    },
    components: {
        eventBus
    }
}