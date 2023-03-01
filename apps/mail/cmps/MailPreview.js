export default {
    props: ['mail'],
    template: `
        <article class="mail-preview">
            <p> {{mail.from}} </p>
            <p> {{mail.subject}} </p>
            <p> {{mail.body}} </p>
        </article>
    `,
}