import { emailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import mailList from "../cmps/mailList.js"

export default {
    template: `
        <section class="email-index">
            <h1>mail</h1>
            <mailList 
                :emails="emails" 
                @remove="removeEmail" />
        </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {},
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails)
    },
    methods: {
        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === emailId)
                    this.emails.splice(idx, 1)
                    showSuccessMsg('mail removed')
                })
                .catch(err => {
                    showErrorMsg('mail remove failed')
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredEmails() {
            const regex = new RegExp(this.filterBy.vendor, 'i')
            return this.emails.filter(email => regex.test(email.vendor))
        }
    },
    components: {
        emailService,
        mailList,
    },
}