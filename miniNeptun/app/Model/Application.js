'use strict'

const Lucid = use('Lucid')

class Application extends Lucid {
    users(){
        return this.belongsTo('App/Model/User')
    }

    courses(){
        return this.belongsTo('App/Model/Course')
    }
}

module.exports = Application
