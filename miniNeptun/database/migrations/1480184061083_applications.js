'use strict'

const Schema = use('Schema')

class ApplicationsTableSchema extends Schema {

  up () {
    this.create('applications', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id')
      table.integer('course_id');
    })
  }

  down () {
    this.drop('applications')
  }

}

module.exports = ApplicationsTableSchema
