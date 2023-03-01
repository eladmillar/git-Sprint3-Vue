
export default {
    props: ['note'],
    template:`<article class="photo-note">
            <p> {{note.info.txt}} </p>
            <img src = {{note.info.url}} width="200" height="200">
           
        </article>
    `   
}