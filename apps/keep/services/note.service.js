'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'notesDB'

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyTxtNote,
  removeTodo,
  getEmptyImgNote,
  getEmptyTodoListNote,
  getEmptyVideoNote,
}

const demoNotes = [
  {
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#B3E5BE',
    },
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },

  {
    id: 'n102',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg',
      title: 'Bobi and Me',
    },
    style: {
      backgroundColor: '#F5FFC9',
    },
  },
  {
    id: 'n103',
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: '#9DC08B',
    },
    info: {
      title: 'Get my stuff together',

      todos: [
        { txt: 'Driving license', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 },
      ],
    },
  },
]
_createNotes()

function query() {
  return storageService.query(NOTES_KEY).then((notes) => {
    //     if (filterBy.txt) {
    //       const regex = new RegExp(filterBy.txt, 'i')
    //       cars = cars.filter((car) => regex.test(car.vendor))
    //     }
    //     if (filterBy.minSpeed) {
    //       cars = cars.filter((car) => car.maxSpeed >= filterBy.minSpeed)
    //     }
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
  // .then(_setNextPrevNoteId)
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function removeTodo(note, todoIdx) {
  console.log('todoIdx:', todoIdx)
  console.log('note', note)
  return storageService.remove(NOTES_KEY, todoIdx)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTES_KEY, note)
  } else {
    return storageService.post(NOTES_KEY, note)
  }
}

// function getEmptyNote(vendor = '', maxSpeed = 0) {

function getEmptyTxtNote() {
  return {
    id: '',
    createdAt: Date.now(),
    type: '',
    isPinned: false,
    style: {
      backgroundColor: '',
    },
    info: {
      txt: '',
    },
  }
}

function getEmptyImgNote() {
  return {
    id: '',
    type: 'NoteImg',
    isPinned: false,
    style: {
      backgroundColor: '#bdc987',
    },
    info: {
      title: '',
      url: '',
    },
  }
}

function getEmptyVideoNote() {
  return {
    id: '',
    type: 'NoteVideo',
    isPinned: false,
    style: {
      backgroundColor: '#bdc987',
    },
    info: {
      title: '',
      url: '',
    },
  }
}

function getEmptyTodoListNote() {
  return {
    id: '',
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: '#94b8c2',
    },
    info: {
      title: '',
      todos: [],
    },
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  // if (!notes || !notes.length) {
    notes = demoNotes
    utilService.saveToStorage(NOTES_KEY, notes)
  // }
}


// function _createNote(vendor, maxSpeed = 250) {
//   const note = getEmptyNote(vendor, maxSpeed)
//   note.id = utilService.makeId()
//   return note
// }

// function _setNextPrevNoteId(note) {
//   return storageService.query(NOTES_KEY).then((cars) => {
//     const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
//     car.nextCarId = cars[carIdx + 1] ? cars[carIdx + 1].id : cars[0].id
//     car.prevCarId = cars[carIdx - 1] ? cars[carIdx - 1].id : cars[cars.length - 1].id
//     return car
//   })
// }
