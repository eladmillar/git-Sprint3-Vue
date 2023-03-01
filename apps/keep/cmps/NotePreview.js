import todoNote from "./todoNote.js"
import textNote from "./textNote.js"
import photoNote from "./photoNote.js"

export default {
    props: ['note'],
    template: `
    <div class="note-card" style="color: note.style.backgroundColor">
    <p>{{note.info.txt}}</p>
         <h3></h3>
         <hr/>
         <component :is="note.type" :note="note.info" @updateNote="updateNote"/>
         <nav><input type="color" ></nav>
    </div>
    `,
    data() {
         return {
         }
    },
    methods: {
         updateInternal() {
              this.updateNote(this.note)
         },
         updateNote(updatedNote) {
              this.$emit('updateNote', updatedNote)
         },
         deleteNote() {
              this.$emit('deleteNote', this.note.id)
         },
    },
    watch: {
         bgColor() {
              console.log(`this.bgColor:`, this.bgColor)
         },
    },
    computed: {
    },
    created() {

    },
    style:{
        color: 'red'
    },
    components: {
        todoNote,
        textNote,
        photoNote,
         
    },
}