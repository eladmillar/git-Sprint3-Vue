export default {
  props: ['note'],
  template: `
  <article
          class="note-details"
          :style="{'background-color': note.style.backgroundColor}"
          >
          <input type="color" 
          v-model="note.style.backgroundColor"
          @input='changeBgcColor'/>

              <input type="text" 
              @input="changeTxt"
              v-model="note.info.title"
              :value="note.info.title"
              :style="{'background-color': note.style.backgroundColor}"
              />
              <ul>
                <li v-for="(todo,idx) in note.info.todos"
                :class="todo.doneAt ? 'doneTodo' : ''"
                @click="todo.doneAt = todo.doneAt ? null : Date.now()"
                > 
                    {{todo.txt}}
                    <button @click.stop="removeTodo(idx)">X</button>
                </li>
              </ul>
              <button class="close-modal"  @click='closeModal'>x</button>
              <input v-model="userNewTodo" type="text"/>
              <button class="add-todo" @click='AddTodo'>AddTodo</button>
          </article>
  `,

  data() {
    return {
      userNewTodo: '',
    }
  },
  methods: {
    changeBgcColor() {
      this.$emit('changeBgcColor', this.note.style.backgroundColor)
    },

    removeTodo(todoIdx) {
      const note = JSON.parse(JSON.stringify(this.note))

      note.info.todos.splice(todoIdx, 1)
      console.log('note:', note)
      this.$emit('updateNote', note)
    },
    AddTodo() {
      console.log('addTodo', this.userNewTodo)
      if (this.userNewTodo === '') return
      this.$emit('addTodo', { txt: this.userNewTodo, doneAt: null })
    },

    changeTxt() {
      console.log('this.note.info.txt', this.note.info.txt)
      this.$emit('changeTxt', this.note.info.txt)
    },
    closeModal() {
      this.$emit('closeModal')
    },
  },

  created() {},
  components: {},
  emits: [],
}
