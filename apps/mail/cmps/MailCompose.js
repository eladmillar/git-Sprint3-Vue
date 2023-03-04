import { emailService } from '../services/mail.service.js'

export default {
    template: `
        <section v-if="email" class="email-compose">
            <form  @submit.prevent="send" class="grid">
                <header class="compose-header flex justify-between"> 
                    <h2>New Email</h2>
                    <button class="close-btn" @click="close">X</button>
                </header>
               
             <input required type="text" v-model="email.to" placeholder="to: (Email address)" />
              <input required type="text" v-model="email.subject" placeholder="subject" />
              <textarea required v-model="email.body" cols="50" rows="18"></textarea>
              <button>Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    created() {
        this.email = emailService.getEmptyEmail('', emailService.loggedInUser.email, '')
        this.email.to = ''
        this.email.body = ''
    },
    methods: {
        send() {
            this.$emit('send', this.email)
        },
        close() {
            this.$emit('close')
        }
    },
    components: {
        emailService,
    }
}