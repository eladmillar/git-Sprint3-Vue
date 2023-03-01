import { noteService } from "../services/note.service.js"

import noteList from '../cmps/NoteList'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export default {
    template: `
        <section class="note-index">
        <textarea v-model="message" placeholder="add your note.."></textarea>
            <noteList 
                :notes="filteredNotes" 
                @remove="removeNote"/>
          
        </section>
    `,
    data() {
        return {
            notes: [],
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    methods: {
        removeNote(noteId) {
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    showSuccessMsg('note removed')
                })
                .catch(err => {
                    showErrorMsg('note remove failed')
                })
        },
        onSaveNote(newNote){
            this.notes.unshift(newNote)
        }}
    }