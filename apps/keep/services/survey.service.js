'use strict'

export const surveyService = {
  getSurvey,
}

function getSurvey() {
  return Promise.resolve(survey)
}

const survey = {
  title: 'Robots Shopping Today',
  color: 'red',
  cmps: [
    {
      type: 'NoteTxt',
      info: {
        label: 'Your fullname:',
      },
    },
    
  ],
}
