const Cabecalho = require('./cabecalho');

class CalcularEstande {
    render(lado, area, isEstandeMedio) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
            </head>
                <body>
                    ${Cabecalho.render()}               
                    <h2>Explicação da conta</h2>
                    <p>A área de um heptadecágono regular pode ser calculada usando a fórmula:</p>
                    <p><strong>Área = (17/4) * lado^2 * (1 / tan(π/17))</strong></p>
                    <p>- <strong>lado</strong>: Comprimento de um lado do heptadecágono.</p>
                    <p>- <strong>π</strong>: Número Pi (aproximadamente 3.14159).</p>
                    <p>- <strong>tan(π/17)</strong>: Tangente do ângulo π/17, que é metade do ângulo central de um heptadecágono regular.</p>
                    <p>- <strong>(17/4)</strong>: Constante de conversão.</p>
                    <p>A fórmula calcula a área multiplicando o comprimento do lado pelo seu quadrado e pela tangente do ângulo π/17. O resultado é a área do heptadecágono.</p>
                    <h2>Resposta:</h2>
                    <p>Lado do heptadecágono inserido: ${lado}</p>
                    <p>Área do estande: ${area} metros quadrados</p>
                    ${isEstandeMedio ? '<p>É um estande médio.</p>' : '<p>É um estande que não segue o padrão.</p>'}
                    <h4><footer>Desenvolvido por Lucas Diniz</footer><h4>
                </body>
            </html>
        `;
    }
}

module.exports = CalcularEstande;