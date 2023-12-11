const Formacao = require('../models/Formacao')

class FormacaoView {
    static render() {
      let formacoes = []
      let result = "<ul>"
      formacoes.push(new Formacao("Análise e desenvolvimento de sistemas (Cursando)","Universidade Estácio De Sá"))
      formacoes.push(new Formacao("Técnico em Informática para Internet (Cursando)","Instituto Federal do Ceará"))
      for (let i = 0; i < formacoes.length; i++) {
        result += formacoes[i].toString()
      }
      result += "</ul>"
      return result;
    }
  }
  
  module.exports = FormacaoView;   