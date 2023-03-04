export default {
  props: ['info'],
  template: `
 <iframe :src="'https://www.youtube.com/embed/'+info.url"></iframe>
          `,
  created() {
    console.log('this.info', this.info)
  },
}
