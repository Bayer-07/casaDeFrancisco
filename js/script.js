function navegarProjetos() {
    console.log("Apertou o botão 'Nossos Projetos'")
}

function navegarEventos() {
    console.log("Apertou o botão 'Eventos'")
}






async function getDados() {
    try {
        const informacaoEventosPrincipais = await fetch(
            "https://lycs5ydc.api.sanity.io/v2025-10-29/data/query/production?query=*%0A%5B%0A++_type+%3D%3D+%27eventos_principais%27%0A%5D%0A%7B%0A++dataEHora%2C%0A++local%2C%0A++descricao%2C%0A++nome%0A%7D&perspective=drafts",
            {
                method: "GET",
            }
        );

        const dado = await informacaoEventosPrincipais.json();
        console.log(dado)

        const wrapper = document.querySelector("[class = 'eventos']");

        for (let index = 0; index < dado.length; index++) {


            let divCartaoEventos = document.createElement('div')
            divCartaoEventos.classList.add('cartao')
            wrapper.append(divCartaoEventos)

            let h3CartaoEventos = document.createElement('h3')
            h3CartaoEventos.innerText = dado[i].nome
            wrapper.append(h3CartaoEventos)
            divCartaoEventos.append(h3CartaoEventos)

            let pCartaoEventos = document.createElement('p')
            pCartaoEventos.innerText = dado[i].descricao
            wrapper.append(pCartaoEventos)
            divCartaoEventos.append(h3CartaoEventos)

            let spanCartaoEventos1 = []
            let spanCartaoEventos2 = []

            let divInfoCartaoEventos = []


            for (let i = 0; i < 3; i++) {

                divInfoCartaoEventos[i] = document.createElement('div')
                divInfoCartaoEventos.classList.add('info')
                wrapper.append(divInfoCartaoEventos)
                divCartaoEventos.append(divInfoCartaoEventos)


                spanCartaoEventos1[i] = document.createElement('span')
                spanCartaoEventos2[i] = document.createElement('span')
                spanCartaoEventos1[i].classList.add('material-symbols-outlined')
                wrapper.append(divInfoCartaoEventos)
                divCartaoEventos.append(divInfoCartaoEventos)
                divInfoCartaoEventos.append(spanCartaoEventos1)
                divInfoCartaoEventos.append(spanCartaoEventos2)

            }


        }

    } catch (err) {
        console.error(err.message);
    }
}
getDados()


/* <div class="cartao">
    <h3>Título do Evento</h3>
    <p>Aqui deve ficar a descrição do evento para o pessoal saber o que acontece durante o evento</p>
    <div class="info">
        <span class="material-symbols-outlined"> calendar_today</span>
        <span>Data do evento</span>
    </div>

    <div class="info">
        <span class="material-symbols-outlined">nest_clock_farsight_analog</span>
        <span>Horário do evento</span>
    </div>

    <div class="info">
        <span class="material-symbols-outlined">location_on</span>
        <span>Local do evento</span>
    </div>
</div> */