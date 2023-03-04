export default {
  props: ['note'],
  template: `
    <article 
          class="note-details"
          :style="{'background-color': note.style.backgroundColor}"
          >
          <button class="color-pic">
            🎨
            <input type="color" 
            v-model="note.style.backgroundColor"
            @input='changeBgcColor'/>
          </button>
         

          <input type="color" ref="colorPicker" @input="setColor" style="display: none;">

              <input @input="changeTxt"
              v-model="note.info.txt"
              type="text" :value="note.info.txt"
              :style="{'background-color': note.style.backgroundColor}"
              />
              <button class="close-modal" @click='closeModal'>x</button>
          </article>
          `,

  data() {
    return {}
  },
  methods: {
    changeBgcColor(color) {
      this.$emit('changeBgcColor', this.note.style.backgroundColor)
    },

    changeTxt() {
      console.log('this.note.info.txt', this.note.info.txt)
      this.$emit('changeTxt', this.note.info.txt)
    },

    closeModal() {
      this.$emit('closeModal')
    },
  },
  computed: {},
  created() {},
  components: {},
  emits: [],
}
