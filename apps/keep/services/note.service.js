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
    createdAt: utilService.getDateNote(),
    // createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: utilService.getRandomColor(),
    },
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },

  {
    id: 'n102',
    createdAt: utilService.getDateNote(),
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://media.istockphoto.com/id/1150952747/photo/close-up-of-legs-and-feet-of-football-player-in-blue-socks-and-shoes-running-and-dribbling.jpg?s=612x612&w=0&k=20&c=QQFpYIjyB7ciSfIootizxFo01A005q6SZqBH4YrJJ-8=',
      title: 'football practice',
    },
    style: {
      backgroundColor: utilService.getRandomColor(),
    },
  },
  {
    id: 'n103',
    createdAt: utilService.getDateNote(),
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: utilService.getRandomColor(),
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
    createdAt: utilService.getDateNote(),
    type: '',
    isPinned: false,
    style: {
      backgroundColor: utilService.getRandomColor(),
    },
    info: {
      txt: '',
    },
  }
}

function getEmptyImgNote() {
  return {
    id: '',
    createdAt: utilService.getDateNote(),
    type: 'NoteImg',
    isPinned: false,
    style: {
      backgroundColor: utilService.getRandomColor(),
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
    createdAt: utilService.getDateNote(),
    type: 'NoteVideo',
    isPinned: false,
    style: {
      backgroundColor: utilService.getRandomColor(),
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
    createdAt: utilService.getDateNote(),
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: utilService.getRandomColor(),
    },
    info: {
      title: '',
      todos: [],
    },
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  //  if (!notes || !notes.length) {
    notes = demoNotes
    utilService.saveToStorage(NOTES_KEY, notes)
  //  }
}



