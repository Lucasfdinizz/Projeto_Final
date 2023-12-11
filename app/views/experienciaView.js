const Experiencia = require('../models/Experiencia')

class ExperienciaView {
    static render() {
      let experiencia = []
      let result = "<ul>"
      experiencia.push(new Experiencia("3º Sgt","Exército Brasileiro","2016"))
      for (let i = 0; i < experiencia.length; i++) {
        result += experiencia[i].toString()
      }
      result += "</ul>"
      return result;
    }
  }
  
  module.exports = ExperienciaView;