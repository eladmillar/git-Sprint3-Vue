export default {
  props: ['info'],
  template: `
  
            <h2>{{info.title}}</h2>
           <img :src="info.url" width="200" height="200"/>

        `,

  //   data() {

  // return
  //   },
  created() {
    console.log('this.info', this.info)
  },
}
