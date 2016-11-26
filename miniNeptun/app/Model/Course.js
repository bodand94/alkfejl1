'use strict'

const Lucid = use('Lucid')

class Course extends Lucid {
    applications() {
        return this.hasMany('App/Model/Application')
    }
}

module.exports = Course
