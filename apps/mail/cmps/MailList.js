import mailPreview from './MailPreview.js'
import { emailService } from '../services/mail.service.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul class="grid">
                <li v-for="email in emails" :key="email.id" :class="email.isRead ? 'isRead': ''" class="clean-list">
                <!-- <RouterLink :to="'/email/'+email.id"> -->
                    <mailPreview :email="email" @remove="removeEmail"/>
                <!-- </RouterLink>  -->
                    <!-- <RouterLink :to="'/email/'+email.id">Details</RouterLink> | -->
                    <section class="li-btns">
                        <button @click="unreadEmail(email)"><i class="fa-regular fa-envelope"></i></button>
                        <button @click="removeEmail(email.id)"><i class="fa-solid fa-trash-can"></i></button>
                    </section>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            isRead: null,
        }
    },
    methods: {
        removeEmail(emailId) {
            this.$emit('remove', emailId)
        },
        unreadEmail(email) {
            email.isRead = !email.isRead
            emailService.save(email)
        },
    },
    components: {
        mailPreview,
        emailService,
    }
}