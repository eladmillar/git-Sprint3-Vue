export default {
  props: ['info'],
  template: `
  
            <h2 class="title">{{info.title}}</h2>
           <img class = "note-img" :src="info.url"/>

        `,

  //   data() {

  // return
  //   },
  created() {
    console.log('this.info', this.info)
  },
}
