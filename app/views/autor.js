const Template = require('./template/main');
const ExperienciaView = require('./experienciaView');
const FormacaoView = require('./formacaoView');

class Autor {
    render() {
        return new Template(`
            <h2>Autor</h2>
            <ul>
                <li>Lucas de França Diniz</li>
            </ul>
            <h2>Formações Acadêmicas</h2>
            ${FormacaoView.render()} 
            <h2>Experiências Profissionais</h2>
            ${ExperienciaView.render()} 
        `).render();
    }
}

module.exports = Autor;