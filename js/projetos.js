document.addEventListener("DOMContentLoaded", () => {
    getDados();
});

// Função para inicializar um carrossel específico
function inicializarCarrossel(cardElement) {
    const wrapper = cardElement.querySelector('.carousel-slide-wrapper');
    const images = wrapper.querySelectorAll('img');
    const prevBtn = cardElement.querySelector('.prev-btn');
    const nextBtn = cardElement.querySelector('.next-btn');
    const indicatorsContainer = cardElement.querySelector('.carousel-indicators');

    let currentIndex = 0;
    const slideCount = images.length;

    if (slideCount === 0) return;

    // Cria os indicadores
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        indicator.dataset.index = i;
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }

    const indicators = indicatorsContainer.querySelectorAll('.indicator');

    function goToSlide(index) {
        currentIndex = (index + slideCount) % slideCount; // Garante que o índice seja sempre válido
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Inicia no primeiro slide
    goToSlide(0);
}






async function getDados() {
    try {
        // Unifiquei as chamadas da API para simplificar
        const response = await fetch(
            "https://lycs5ydc.api.sanity.io/v2025-10-30/data/query/production?query=*%5B_type+%3D%3D+%27eventos%27%5D%7B%0A++nome%2C%0A++local%2C%0A++dataEHora%2C%0A++descricao%2C%0A++%22imagem1%22%3A+imagem1.asset-%3Eurl%2C%0A++%22imagem2%22%3A+imagem2.asset-%3Eurl%2C%0A++%22imagem3%22%3A+imagem3.asset-%3Eurl%0A%7D&perspective=published",
            { method: "GET" }
        );

        const dadosJSON = await response.json();
        const dados = dadosJSON.result;
        console.log(dados)

        if (!dados || dados.length === 0) {
            console.log("Nenhum dado encontrado.");
            return;
        }

        const wrapperPrincipal = document.getElementById("wrapper");

        dados.forEach(item => {
            // Cria o card do projeto
            const divCardProjeto = document.createElement('div');
            divCardProjeto.classList.add('card-projeto');

            // Cria a parte de texto
            const divInfoCard = document.createElement('div');
            divInfoCard.classList.add('texto-card');

            const dataHora = new Date(item.dataEHora);
            const dataFormatada = dataHora.toLocaleDateString('pt-BR');
            const horaFormatada = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            divInfoCard.innerHTML = `
                <h1>${item.nome}</h1>
                <div class="info"><span class="material-symbols-outlined" style="user-select:none;">calendar_today</span><span>${dataFormatada}</span></div>
                <div class="info"><span class="material-symbols-outlined" style="user-select:none;">nest_clock_farsight_analog</span><span>${horaFormatada}</span></div>
                <div class="info"><span class="material-symbols-outlined" style="user-select:none;">location_on</span><span>${item.local}</span></div>
                <div class="info"><span class="material-symbols-outlined" style="user-select:none;">error</span><span>${item.descricao}</span></div>
            `;

            // Cria o carrossel
            const carrosselWrapper = document.createElement('div');
            carrosselWrapper.classList.add('carousel-container');

            const imagens = [item.imagem1, item.imagem2, item.imagem3].filter(Boolean); // Filtra imagens nulas/undefined

            carrosselWrapper.innerHTML = `
                <div class="carousel-slide-wrapper">
                    ${imagens.map(imgUrl => `<img src="${imgUrl}" alt="Imagem do evento ${item.nome}">`).join('')}
                </div>
                <button class="prev-btn">❮</button>
                <button class="next-btn">❯</button>
                <div class="carousel-indicators"></div>
            `;

            // Monta o card completo
            divCardProjeto.append(divInfoCard, carrosselWrapper);
            wrapperPrincipal.append(divCardProjeto);

            // Inicializa o carrossel para este card específico
            inicializarCarrossel(divCardProjeto);
        });

    } catch (err) {
        console.error("Erro ao buscar dados:", err);
    }
}
