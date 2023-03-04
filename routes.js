import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import MailDetails from './apps/mail/pages/MailDetails.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import MailList from './apps/mail/cmps/MailList.js'
import BookIndex from './apps/books/pages/BookIndex.js'
import BookDetails from './apps/books/pages/BookDetails.js'
import BookEdit from './apps/books/pages/BookEdit.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/email',
			component: MailIndex,
			children: [
				{
					path: '/',
					component: MailList
				},
				{
					path: '/email/:emailId',
					component: MailDetails
				}
			]
		},
		{
			path: '/book',
			component: BookIndex
		},
		{
			path: '/book/:bookId',
			component: BookDetails
		},
		{
			path: '/book/edit/:bookId?',
			component: BookEdit
		},
		{
			path: '/note',
			component: NoteIndex,
		},
	],
}

export const router = createRouter(routerOptions)
