import { emailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { eventBus } from "../../../services/event-bus.service.js"

import emailList from "../cmps/MailList.js"
import emailFilter from "../cmps/MailFilter.js"

export default {
    template: `
        <section class="email-index grid">
            <button>Compose</button>
            <emailFilter @filter="setFilterBy"/>
            <div>
                <!-- <RouterLink to="/email/">Inbox</RouterLink> | -->
                <!-- <RouterLink to="/email/:emailId">email</RouterLink> -->
            </div>
            <emailList  v-if="home"
                :emails="filteredEmails" 
                @remove="removeEmail" />
            <RouterView v-else />
        </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {},
            home: true,
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails)
        eventBus.on('go to inbox', () => { this.home = true })
        eventBus.on('leave inbox', () => { this.home = false })
    },
    methods: {
        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === emailId)
                    this.emails.splice(idx, 1)
                    showSuccessMsg('Email removed')
                })
                .catch(err => {
                    showErrorMsg('Email remove failed')
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredEmails() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.emails.filter(email =>
                regex.test(email.body)
                || regex.test(email.subject)
                || regex.test(email.from)
            )
        }
    },
    components: {
        emailService,
        emailList,
        emailFilter,
        eventBus
    },
}