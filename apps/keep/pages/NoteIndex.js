import { noteService } from "../services/note.service.js"

import noteList from "../cmps/NoteList.js"
// import noteList from '../cmps/NoteList.js'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export default {
    template: `
        <h1>notes</h1>
        <section class="note-index">
        <form>
        <input type="text" ref="my_input">
        <button @click.prevent="getFormValues()">+</button>
        </form>
        <noteList 
                :notes="notes" 
                @remove="removeNote"/>    
          
        </section>
    `,

    data() {
        return {
            notes: [],
            filterBy: {},
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
        }},
        computed: {
            filteredNotes() {
                const regex = new RegExp(this.filterBy.type, 'i')
                return this.notes.filter(note => regex.test(note.type))
            }
        },
         components: {
            noteService,
            noteList,
         },
    }
    