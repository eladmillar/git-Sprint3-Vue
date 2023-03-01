import { mailService } from "../services/mail.service.js"

import MailList from "../cmps/MailList.js"

export default {
    template: `
        <section class="mail-index">
            <h1>Mail</h1>
            <MailList 
                :mails="mails" 
                @remove="removeMail" />
        </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: {},
        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails)
    },
    methods: {
        removeMail(mailId) {
            mailService.remove(mailId)
                .then(() => {
                    const idx = this.mails.findIndex(mail => mail.id === mailId)
                    this.mails.splice(idx, 1)
                    showSuccessMsg('Mail removed')
                })
                .catch(err => {
                    showErrorMsg('Mail remove failed')
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredMails() {
            const regex = new RegExp(this.filterBy.vendor, 'i')
            return this.mails.filter(mail => regex.test(mail.vendor))
        }
    },
    components: {
        mailService,
        MailList,
    },
}