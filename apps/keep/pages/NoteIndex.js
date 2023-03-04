import { noteService } from '../services/note.service.js'
import { youtubeService } from '../services/youtube.service.js'
import NoteList from '../cmps/NoteList.js'
import NoteDetails from '../cmps/NoteDetails.js'

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
  template: `
      <section class="main-container"> 
          <section class="side-bar-conatiner"> 
              <ul>
                  <li>💡 Notes</li>
                  <li>🔔 Reminders</li>
                  <li>🖊 Edit Labels</li>
                  <li>☑ Archive</li>
                  <li>🚮 Trash</li>
             </ul>
          </section>


          <section class="notes-conatiner">
              <section class="search-container">
                <!-- <form>
                  <button>🔍</button>
                  <input type="search" placeholder="Search Keep..." />
                 </form> -->
                 <form @submit.prevent="filterbytxt" >
               <button><i class="fa-solid fa-magnifying-glass"></i></button>
                <input type="search" placeholder="Search mail" v-model="filtertxt" />
               </form>
                </section>

                    <form class="addnote-container" @submit.prevent="uploadNote">
                      <input v-model="userTxt" class="takeANote" :type="text" :placeholder="currInputType"/>

                      <div>
                        <button type="button" @click="changeInputType('NoteTxt')">A</button>
                        <button type="button" @click="changeInputType('img')" >🖼</button>
                        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;">
                        <!-- <input class="add-img" type="file" @change="onFileSelected" >🖼</input></button> -->
                        <button type="button" @click="changeInputType('NoteVideo')" >📽</button>
                        <button type="button" @click="changeInputType('todoList')" >📃</button>
                        <button type="submit" >+</button>
                      </div>

                      </form>

                      <section>
              <NoteList 
              @removeNote="removeNote"
              @openDetails="openDetails"
              :notes="notes"/> 
              <!-- todo: notes to show in computed (for filter)  -->
  
               <!-- </section> -->
               </section>

               <NoteDetails
               :selectedNote="selectedNote"
               @updateNote='updateNote'
               @closeModal='selectedNote = null'
               @changeTxt='changeTxt'
               @changeBgcColor='changeBgcColor'
               @addTodos='addTodo'
               @deleteTodo='removeTodo'
               v-if="selectedNote"/>
               
     </section> 
     </section> 
      `,
  //
  data() {
    return {
      note: noteService.getEmptyTxtNote(),
      userTxt: '',
      notes: null,
      currInputType: 'NoteTxt',
      selectedNote: null,
      selectedImg: null,
      videoUrl: null,
    }
  },

  methods: {
    chooseFile() {
      this.$refs.fileInput.click()
    },

    handleFileChange(event) {
      console.log('Selected file:', event.target.files[0])
      this.selectedFile = event.target.files[0]
      const url = this.imageUrl
      this.addImgNote(url)
      console.log('this.note', this.note)
    },

    updateNote(updatedNote) {
      console.log('updatedNote:', updatedNote)
      noteService
        .save(updatedNote)
        .then(() => {
          const idx = this.notes.findIndex((note) => note.id === updatedNote.id)
          this.selectedNote = updatedNote
          this.notes.splice(idx, 1, updatedNote)
          console.log('this.notes:', this.notes)
          showSuccessMsg('Note removed')
        })
        .catch((err) => {
          showErrorMsg('Note remove failed')
        })
    },

    addTodo(todo) {
      this.selectedNote.info.todos.push(todo)
    },

    changeBgcColor(color) {
      console.log('color:', color)
      this.selectedNote.style.backgroundColor = color
      noteService
        .save(this.selectedNote)
        .then(() => {
          showSuccessMsg('Note Update')
        })
        .catch((err) => {
          showErrorMsg('Note Update failed')
        })
    },

    changeTxt(txt) {
      this.selectedNote.info.txt = txt
      noteService
        .save(this.selectedNote)
        .then(() => {
          showSuccessMsg('Note Update')
        })
        .catch((err) => {
          showErrorMsg('Note Update failed')
        })
    },

    changeInputType(val) {
      this.currInputType = val
      if (this.currInputType === 'NoteTxt') this.note = noteService.getEmptyTxtNote()
      else if (this.currInputType === 'img') {
        this.note = noteService.getEmptyImgNote()
        this.chooseFile()
      } else if (this.currInputType === 'todoList') this.note = noteService.getEmptyTodoListNote()
      else if (this.currInputType === 'NoteVideo') {
        this.note = noteService.getEmptyVideoNote()
        this.uploadVideo(this.userTxt)
      }
    },

    openDetails(note) {
      this.selectedNote = note
      // this.$router.push('/keep/' + note.id)
    },

    addTodoList(text) {
      text.split(',').forEach((todoTxt, idx) => {
        // handle first intaration for the title:
        if (idx === 0) this.note.info.title = todoTxt
        else this.note.info.todos.push({ txt: todoTxt, doneAt: null })
      })

      noteService
        .save(this.note)
        .then(() => {
          this.notes.push(this.note)
          // this.note = noteService.getEmptyNote()
          showSuccessMsg('Note saved')
          // this.$router.push('/keep' + this.note.id)
        })
        .catch(() => {
          showErrorMsg('Note save failed')
        })
    },

    addImgNote(url) {
      if (!this.selectedFile) return
      this.note.info.url = url

      noteService
        .save(this.note)
        .then(() => {
          this.notes.push(this.note)
          // this.note = noteService.getEmptyNote()
          showSuccessMsg('Note saved')
          // this.$router.push('/keep' + this.note.id)
        })
        .catch(() => {
          showErrorMsg('Note save failed')
        })
    },

    removeNote(noteId) {
      noteService
        .remove(noteId)
        .then(() => {
          const idx = this.notes.findIndex((note) => note.id === noteId)
          this.notes.splice(idx, 1)
          showSuccessMsg('Note removed')
        })
        .catch((err) => {
          showErrorMsg('Note remove failed')
        })
    },

    uploadNote() {
      console.log('upload Note', this.userTxt)
      if (this.userTxt === '') return
      if (this.currInputType === 'NoteTxt') this.addTxtNote(this.userTxt, this.currInputType)
      if (this.currInputType === 'todoList') this.addTodoList(this.userTxt, this.currInputType)
      if (this.currInputType === 'img') {
        console.log('heyyy')
        const imgUrl = this.imageUrl()
        this.addImgNote(this.userTxt, imgUrl, this.selectedImg)
      }
    },

    addTxtNote(txt, type) {
      this.note.info.txt = txt
      this.note.type = type
      this.note.style.backgroundColor = '#B3E5BE'
      noteService
        .save(this.note)
        .then(() => {
          this.notes.push(this.note)
          this.note = noteService.getEmptyTxtNote()
          showSuccessMsg('Note saved')
          // this.$router.push('/keep' + this.note.id)
        })
        .catch((err) => {
          showErrorMsg('Note save failed')
        })
    },

    uploadVideo(txt) {
      console.log('txt', txt)
      youtubeService.getYoutubeTopRes(txt).then((data) => {
        this.videoUrl = data.items[0].id.videoId
        console.log('this.videoUrl:', this.videoUrl)
        // if (!this.selectedFile) return
        this.note.info.url = this.videoUrl
        console.log('po1')
        noteService
          .save(this.note)
          .then(() => {
            this.notes.push(this.note)
            console.log('this.note:', this.note)
            // this.note = noteService.getEmptyNote()
            showSuccessMsg('Note saved')
            // this.$router.push('/keep' + this.note.id)
          })
          .catch(() => {
            showErrorMsg('Note save failed')
          })
      })
    },
  },

  computed: {
    noteToShow() {
      // return this.notes.filter((note) => note)
    },
    imageUrl() {
      if (this.selectedFile) {
        return URL.createObjectURL(this.selectedFile)
      } else {
        return null
      }
    },
  },

  created() {
    noteService.query().then((notes) => (this.notes = notes))
  },

  components: {
    NoteList,
    NoteDetails,
  },
}

// function onImgInput(ev) {
//   loadImageFromInput(ev, renderImg)
//   // gImgs.push()
// }

// // CallBack func will run on success load of the img
// function loadImageFromInput(ev, onImageReady) {
//   const reader = new FileReader()
//   // After we read the file
//   reader.onload = function (event) {
//     let img = new Image() // Create a new html img element
//     img.src = event.target.result // Set the img src to the img file we read
//     // Run the callBack func, To render the img on the canvas
//     img.onload = onImageReady.bind(null, img)
//     // Can also do it this way:
//     // img.onload = () => onImageReady(img)
//   }
//   reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
// }
