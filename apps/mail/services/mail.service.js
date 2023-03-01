'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.vendor))
            }
            if (filterBy.minSpeed) {
                mails = mails.filter(mail => mail.maxSpeed >= filterBy.minSpeed)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(_setNextPrevMailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', body = '') {
    const email = {
        id: '',
        subject: 'Miss you!',
        body: utilService.makeLorem(10),
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
    return email
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('test1'))
        mails.push(_createMail('test2'))
        mails.push(_createMail('test3'))
        mails.push(_createMail('test4'))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body = 250) {
    const mail = getEmptyMail(subject, body)
    mail.id = utilService.makeId()
    return mail
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        mail.nextMailId = mails[mailIdx + 1] ? mails[mailIdx + 1].id : mails[0].id
        mail.prevMailId = mails[mailIdx - 1]
            ? mails[mailIdx - 1].id
            : mails[mails.length - 1].id
        return mail
    })
}