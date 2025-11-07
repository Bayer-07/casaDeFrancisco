function navegarProjetos() {
    console.log("Apertou o botão 'Nossos Projetos'")
}

function navegarEventos() {
    console.log("Apertou o botão 'Eventos'")
}






async function getDados() {
    try {
        const informacaoEventosPrincipais = await fetch(
            "https://lycs5ydc.api.sanity.io/v2025-10-30/data/query/production?query=*%0A%5B%0A++_type+%3D%3D+%27eventos_principais%27%0A%5D%0A%7B%0A++dataEHora%2C%0A++local%2C%0A++descricao%2C%0A++nome%0A%7D&perspective=drafts",
            {
                method: "GET",
            }
        );

        const dadoNaoFOrmatado = await informacaoEventosPrincipais.json();
        const dado = dadoNaoFOrmatado.result
        console.log(dado)

        const wrapper = document.querySelector("[class = 'eventos']");

        for (let index = 0; index < dado.length; index++) {

            let divCartaoEventos = document.createElement('div')
            divCartaoEventos.classList.add('cartao')
            wrapper.appendChild(divCartaoEventos)

            let h3CartaoEventos = document.createElement('h3')
            h3CartaoEventos.innerText = dado[index].nome
            divCartaoEventos.appendChild(h3CartaoEventos)

            let pCartaoEventos = document.createElement('p')
            pCartaoEventos.innerText = dado[index].descricao
            divCartaoEventos.appendChild(pCartaoEventos)

            // Data e Hora
            const dataHora = new Date(dado[index].dataEHora);
            const dataFormatada = dataHora.toLocaleDateString('pt-BR');
            const horaFormatada = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            // Div para Data
            let divInfoData = document.createElement('div');
            divInfoData.classList.add('info');
            divInfoData.innerHTML = `
                <span class="material-symbols-outlined">calendar_today</span>
                <span>${dataFormatada}</span>
            `;
            divCartaoEventos.appendChild(divInfoData);

            // Div para Hora
            let divInfoHora = document.createElement('div');
            divInfoHora.classList.add('info');
            divInfoHora.innerHTML = `
                <span class="material-symbols-outlined">nest_clock_farsight_analog</span>
                <span>${horaFormatada}</span>
            `;
            divCartaoEventos.appendChild(divInfoHora);

            // Div para Local
            let divInfoLocal = document.createElement('div');
            divInfoLocal.classList.add('info');
            divInfoLocal.innerHTML = `
                <span class="material-symbols-outlined">location_on</span>
                <span>${dado[index].local}</span>
            `;
            divCartaoEventos.appendChild(divInfoLocal);
        }

    } catch (err) {
        console.error(err.message);
    }
}
getDados()

