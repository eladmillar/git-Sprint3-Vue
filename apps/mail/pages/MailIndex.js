import { emailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { eventBus } from "../../../services/event-bus.service.js"

import emailList from "../cmps/MailList.js"
import emailFilter from "../cmps/MailFilter.js"
import emailFolderList from "../cmps/MailFolderList.js"
import emailCompose from "../cmps/MailCompose.js"

export default {
    template: `
        <section class="email-index grid">
            <button @click="composeEmail">Compose Email</button>
            <emailFilter @filter="setFilterBy"/>
            <emailFolderList 
            @inbox="viewInbox"
            @unread="viewUnread"
            @sent="viewSent"
            :unread="unReadEmails"/>
            <emailList  v-if="home"
                :emails="filteredEmails" 
                @remove="removeEmail" />
            <RouterView v-else />
            <emailCompose v-if="compose" 
            @send="sendMail" @close="closeCompose"/>
        </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {},
            folder: '',
            home: true,
            compose: false,
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
            // console.log('filterBy', filterBy)
            this.filterBy = filterBy
        },
        viewInbox() {
            // console.log('inbox')
            this.folder = ''
        },
        viewUnread() {
            // console.log('unread')
            this.folder = 'unread'
        },
        viewSent() {
            // console.log('sent')
            this.folder = 'sent'
        },
        sendMail(mail) {
            emailService.save(mail)
            this.compose = false
            emailService.query()
                .then(emails => this.emails = emails)
            // .then(this.isCompose = false)
        },
        composeEmail() {
            this.compose = true
        },
        closeCompose() {
            this.compose = false
        }
    },
    computed: {
        filteredEmails() {
            let mails = this.emails
            if (this.folder === 'sent') {
                mails = mails.filter(email => email.from === emailService.loggedInUser.email)
            }
            else (mails = mails.filter(email => email.from !== emailService.loggedInUser.email))
            if (this.folder === 'unread') {
                mails = mails.filter(email => email.isRead === false)
            }
            const regex = new RegExp(this.filterBy.txt, 'i')
            return mails.filter(email =>
                regex.test(email.body)
                || regex.test(email.subject)
                || regex.test(email.from)
            )
        },
        unReadEmails() {
            let unReadEmails = this.emails.filter(email => email.isRead === false && email.from !== emailService.loggedInUser.email).length
            return unReadEmails
        }
    },
    components: {
        emailService,
        emailList,
        emailFilter,
        emailFolderList,
        emailCompose,
        eventBus
    },
}