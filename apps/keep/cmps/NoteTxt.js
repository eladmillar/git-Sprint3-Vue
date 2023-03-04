export default {
  props: ['info'],
  template: `
          <h2 class="title">{{info.txt}}</h2>
     
      `,

  created() {
    // this.emit$('changeInfo',)
  },
}
