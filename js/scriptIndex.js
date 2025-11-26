function navegarProjetos() {
    // Redireciona para a página de projetos
    window.location.href = 'pages/projetosEEventos.html';
}

function navegarEventos() {
    // Faz scroll suave até a seção de eventos na mesma página
    smoothScrollTo('eventos', 20);
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

async function getOrganizacaoData() {
    try {
        const response = await fetch(
            "https://lycs5ydc.api.sanity.io/v2025-11-26/data/query/production?query=*%0A%5B%0A++_type+%3D%3D+%27primeiroTexto%27%0A%5D%0A%0A%7B%0A++img%2C%0A++++texto%0A%7D&perspective=drafts",
            {
                method: "GET",
            }
        );

        const data = await response.json();
        const organizacaoData = data.result[0]; // Pega o primeiro item do array
        
        if (organizacaoData) {
            // Atualiza o texto da organização
            const organizacaoTextContainer = document.querySelector('.organizacao');
            if (organizacaoTextContainer) {
                // Converte <br> do texto em quebras de linha reais e divide em parágrafos
                const textoFormatado = organizacaoData.texto.replace(/\<br\>/g, '\n');
                const paragrafos = textoFormatado.split('\n\n').filter(p => p.trim() !== '');
                
                // Limpa o conteúdo atual e adiciona os novos parágrafos
                organizacaoTextContainer.innerHTML = '';
                paragrafos.forEach(paragrafo => {
                    const p = document.createElement('p');
                    p.textContent = paragrafo.trim();
                    organizacaoTextContainer.appendChild(p);
                });
            }

            // Atualiza a imagem se fornecida pela API
            if (organizacaoData.img && organizacaoData.img.asset && organizacaoData.img.asset._ref) {
                const imagemContainer = document.querySelector('.sao-francisco');
                if (imagemContainer) {
                    // Constrói a URL da imagem do Sanity
                    const imageRef = organizacaoData.img.asset._ref;
                    // Extrai o ID da imagem e as dimensões do reference
                    const parts = imageRef.replace('image-', '').split('-');
                    const imageId = parts[0];
                    const dimensions = parts[1]; // ex: "1233x876"
                    const format = parts[2]; // ex: "png"
                    
                    const imageUrl = `https://cdn.sanity.io/images/lycs5ydc/production/${imageId}-${dimensions}.${format}`;
                    
                    imagemContainer.src = imageUrl;
                    imagemContainer.alt = "Imagem da Organização";
                }
            }
        }

    } catch (error) {
        console.error('Erro ao carregar dados da organização:', error);
        // Mantém o conteúdo estático em caso de erro
    }
}

async function getHistoriaData() {
    try {
        const response = await fetch(
            "https://lycs5ydc.api.sanity.io/v2025-11-26/data/query/production?query=*%0A%5B%0A++_type+%3D%3D+%27segundoTexto%27%0A%5D%0A%0A%7B%0A++imagem%2C%0A++++texto%2C%0A++++titulo%0A%7D&perspective=drafts",
            {
                method: "GET",
            }
        );

        const data = await response.json();
        const historiaData = data.result[0]; // Pega o primeiro item do array
        
        if (historiaData) {
            // Atualiza o título da seção se fornecido
            if (historiaData.titulo) {
                let tituloContainer = document.querySelector('.doutrina-section .titulo h1');
                if (!tituloContainer) {
                    // Se o h1 não existe, cria um novo
                    const tituloDiv = document.querySelector('.doutrina-section .titulo');
                    if (tituloDiv) {
                        tituloContainer = document.createElement('h1');
                        tituloDiv.appendChild(tituloContainer);
                    }
                }
                if (tituloContainer) {
                    tituloContainer.textContent = historiaData.titulo;
                }
            }

            // Atualiza o texto da história
            const historiaTextContainer = document.querySelector('.historia-texto');
            if (historiaTextContainer && historiaData.texto) {
                // Converte <br> do texto em quebras de linha reais e divide em parágrafos
                const textoFormatado = historiaData.texto.replace(/\<br\>/g, '\n');
                const paragrafos = textoFormatado.split('\n\n').filter(p => p.trim() !== '');
                
                // Limpa o conteúdo atual e adiciona os novos parágrafos
                historiaTextContainer.innerHTML = '';
                paragrafos.forEach(paragrafo => {
                    const p = document.createElement('p');
                    p.textContent = paragrafo.trim();
                    historiaTextContainer.appendChild(p);
                });
            }

            // Atualiza a imagem se fornecida pela API (Allan Kardec)
            if (historiaData.imagem && historiaData.imagem.asset && historiaData.imagem.asset._ref) {
                const imagemContainer = document.querySelector('.retrato');
                if (imagemContainer) {
                    // Constrói a URL da imagem do Sanity
                    const imageRef = historiaData.imagem.asset._ref;
                    // Extrai o ID da imagem e as dimensões do reference
                    const parts = imageRef.replace('image-', '').split('-');
                    const imageId = parts[0];
                    const dimensions = parts[1]; // ex: "1233x876"
                    const format = parts[2]; // ex: "png"
                    
                    const imageUrl = `https://cdn.sanity.io/images/lycs5ydc/production/${imageId}-${dimensions}.${format}`;
                    
                    imagemContainer.src = imageUrl;
                    imagemContainer.alt = "Allan Kardec";
                }
            }
        }

    } catch (error) {
        console.error('Erro ao carregar dados da história:', error);
        // Mantém o conteúdo estático em caso de erro
    }
}

async function getTerceiroTextoData() {
    try {
        const response = await fetch(
            "https://lycs5ydc.api.sanity.io/v2025-11-26/data/query/production?query=*%0A%5B%0A++_type+%3D%3D+%27terceiroTexto%27%0A%5D%0A%0A%7B%0A++textMenor%2C%0A++++tituloMenor%2C%0A++++tituloMaior%2C%0A++++textoMaior%0A%7D&perspective=drafts",
            {
                method: "GET",
            }
        );

        const data = await response.json();
        const terceiroTextoData = data.result[0]; // Pega o primeiro item do array
        
        if (terceiroTextoData) {
            // Atualiza o título menor (Oração de São Francisco)
            if (terceiroTextoData.tituloMenor) {
                const tituloMenorContainer = document.querySelector('.bloco.oracao h2');
                if (tituloMenorContainer) {
                    tituloMenorContainer.textContent = terceiroTextoData.tituloMenor;
                }
            }

            // Atualiza o texto menor (Oração)
            if (terceiroTextoData.textMenor) {
                const textoMenorContainer = document.querySelector('.bloco.oracao p');
                if (textoMenorContainer) {
                    // Converte <br> em quebras de linha HTML reais
                    const textoFormatado = terceiroTextoData.textMenor.replace(/\<br\>/g, '<br>');
                    textoMenorContainer.innerHTML = textoFormatado;
                }
            }

            // Atualiza o título maior (São Francisco de Assis)
            if (terceiroTextoData.tituloMaior) {
                const tituloMaiorContainer = document.querySelector('.titulo-texto .titulo h1');
                if (tituloMaiorContainer) {
                    tituloMaiorContainer.textContent = terceiroTextoData.tituloMaior;
                }
            }

            // Atualiza o texto maior (Sobre São Francisco)
            if (terceiroTextoData.textoMaior) {
                const textoMaiorContainer = document.querySelector('.bloco.texto p');
                if (textoMaiorContainer) {
                    // Converte <br> do texto em quebras de linha HTML reais
                    const textoFormatado = terceiroTextoData.textoMaior.replace(/\<br\>/g, '<br>');
                    textoMaiorContainer.innerHTML = textoFormatado;
                }
            }
        }

    } catch (error) {
        console.error('Erro ao carregar dados do terceiro texto:', error);
        // Mantém o conteúdo estático em caso de erro
    }
}

getDados()
getOrganizacaoData()
getHistoriaData()
getTerceiroTextoData()
