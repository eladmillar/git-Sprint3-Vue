export default {
  props: ['info'],
  template: `
        
              <h2 class="title">{{info.title}}</h2>
              <ul>
                <li v-for="todo in todos" :key="todo.id">
                   <p :class="todo.doneAt ? 'doneTodo' : ''"> 
                    {{todo.txt}}
                   </p>
                 </li>
              </ul>
         
          `,

  data() {
    return {
      todos: this.info.todos,
    }
  },
}
