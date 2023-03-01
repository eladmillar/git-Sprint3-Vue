
export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <p> {{note.info.txt}} </p>
        </article>
    `,
}