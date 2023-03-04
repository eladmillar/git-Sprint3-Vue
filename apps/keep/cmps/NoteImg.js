export default {
  props: ['info'],
  template: `
  
            <h2>{{info.title}}</h2>
           <img :src="info.url"/>

        `,

  //   data() {

  // return
  //   },
  created() {
    console.log('this.info', this.info)
  },
}
