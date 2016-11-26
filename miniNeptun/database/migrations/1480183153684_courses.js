'use strict'

const Schema = use('Schema')

class CoursesTableSchema extends Schema {

  up () {
    this.drop('courses')
    this.create('courses', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 80)
      table.integer('credit')
    })
  }

  down () {
    this.drop('courses')
  }

}

module.exports = CoursesTableSchema
