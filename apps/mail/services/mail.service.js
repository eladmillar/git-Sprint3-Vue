'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'emailDB'

_createEmails()

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(emails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regex.test(email.vendor))
            }
            if (filterBy.minSpeed) {
                emails = emails.filter(email => email.maxSpeed >= filterBy.minSpeed)
            }
            return emails
        })
}

function get(emailId) {
    return storageService.get(MAIL_KEY, emailId)
        .then(_setNextPrevEmailId)
}

function remove(emailId) {
    return storageService.remove(MAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(MAIL_KEY, email)
    } else {
        return storageService.post(MAIL_KEY, email)
    }
}

function getEmptyEmail(subject = utilService.makeLorem(10), from = '') {
    const email = {
        id: '',
        subject,
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: utilService.getDate(),
        removedAt: null,
        from,
        to: 'user@appsus.com'
    }
    return email
}

function _createEmails() {
    let emails = utilService.loadFromStorage(MAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(_createEmail(undefined, 'Brandon@Sanderson.com'))
        emails.push(_createEmail(undefined, 'Coding@Academy.ca'))
        emails.push(_createEmail('trying to see if this works', 'Yiftach@Silberbaum.co.il'))
        emails.push(_createEmail())
        emails.push(_createEmail())
        emails.push(_createEmail())
        emails.push(_createEmail())
        emails.push(_createEmail())
        emails.push(_createEmail())
        emails.push(_createEmail())
        emails.push(_createEmail())
        emails.push(_createEmail())
        utilService.saveToStorage(MAIL_KEY, emails)
    }
}

function _createEmail(subject, from = 'Momo@Momo.com') {
    const email = getEmptyEmail(subject, from)
    email.id = utilService.makeId()
    return email
}

function _setNextPrevEmailId(email) {
    return storageService.query(MAIL_KEY).then((emails) => {
        const emailIdx = emails.findIndex((currEmail) => currEmail.id === email.id)
        email.nextEmailId = emails[emailIdx + 1] ? emails[emailIdx + 1].id : emails[0].id
        email.prevEmailId = emails[emailIdx - 1]
            ? emails[emailIdx - 1].id
            : emails[emails.length - 1].id
        return email
    })
}