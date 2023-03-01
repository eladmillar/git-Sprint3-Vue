export default {
    props: ['note'],
    template:`<article class="text-note">
            <p> {{note.info.txt}} </p>
            <button @click="remove(note.id)">x</button> 
        </article>
    `   
}