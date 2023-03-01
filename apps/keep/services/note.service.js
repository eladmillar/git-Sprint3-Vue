'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

const notes = [
  {
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#00d'
    },
    info: {
      txt: 'Fullstack Me Baby!'
    }
  },
  {
    id: 'n102',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'http://some-img/me',
      title: 'Bobi and Me'
    },
    style: {
      backgroundColor: '#00d'
    }
  },
  {
    id: 'n103',
    type: 'NoteTodos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving license', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 }
      ]
    }
  }
]

// _createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  // getEmptyNote,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) => regex.test(note.title))
    }
    // if (filterBy.maxPrice) {
    //   notes = notes.filter((note) => note.listPrice.amount <= filterBy.maxPrice)
    // }
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

// function getEmptynote(title = '', price = 0) {
//   return {
//     id: '',
//     title,
//     subtitle: utilService.makeLorem(8),
//     authors: [utilService.makeLorem(2)],
//     categories: [utilService.makeLorem(1), utilService.makeLorem(1)],

//     publishedDate: 1920 + Math.random() * 100,
//     description: utilService.makeLorem(20),

//     pageCount: Math.random() * 1000,
//     thumbnail: 'https://drmichellebraun.com/wp-content/uploads/2016/10/note-Placeholder.png',
//     language: 'en',
//     listPrice: {
//       amount: price,
//       currencyCode: 'ILS',
//       isOnSale: true,
//     },
//   }
// }
