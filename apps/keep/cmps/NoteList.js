import notePreview from './NotePreview.js'

export default {
    props: ['notes'],
    template: `
        <section class="notes-list">
            <ul class="grid">
                <li v-for="note in notes" :key="note.id" class="clean-list">
                    <notePreview :note="note"/>
                    <button @click="remove(note.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
    },
    components: {
        notePreview,
    }
}