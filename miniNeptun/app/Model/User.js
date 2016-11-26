'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  applications(){
    return this.hasMany('App/Model/Application')
  }

}

module.exports = User
