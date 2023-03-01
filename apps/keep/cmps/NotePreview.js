
export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <p> {{note.text}} </p>
        </article>
    `,
}