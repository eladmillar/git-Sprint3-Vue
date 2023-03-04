// import NotePreview from './NotePreview.js'
// import { noteService } from '../services/note.service.js'
import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'
import NoteTodos from './NoteTodos.js'
import NoteVideo from './NoteVideo.js'

export default {
  props: ['notes'],
  template: `
        <section class="notes-container">
            <ul v-if="notes">
                <li v-for="note in notes" :key="note.id">
                
                <article class="note"
                @click="openDetails(note)"
                :style="{'background-color': note.style.backgroundColor}">

                    <Component
                    @changeInfo="updateNote" 
                    :is="note.type"
                    :info="note.info"/>
                    <button @click.stop="remove(note.id)">x</button>

                  </article>
                  </li>
                </ul>
              </section>
              `,

  methods: {
    openDetails(note) {
      this.$emit('openDetails', note)
    },

    remove(noteId) {
      this.$emit('removeNote', noteId)
    },
  },

  components: {
    NoteTxt,
    NoteImg,
    NoteTodos,
    NoteVideo,
  },
}
