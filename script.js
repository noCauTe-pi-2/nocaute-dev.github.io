
/* ==============================
   CADASTRO DOS INTEGRANTES
================================ */

const integrantes = [
    {
        nome: 'Adriel Germano Ferreira',
        funcao: 'Equipe de desenvolvimento',
        foto: '',
        rede: 'linkedin',
        link: 'https://www.linkedin.com/in/adriel-germano-ferreira-104555372/'
    },
    {
        nome: 'Arthur Felipe Corrêa',
        funcao: 'Equipe de desenvolvimento',
        foto: '',
        rede: 'instagram',
        link: 'https://www.instagram.com/arthurzfelipe?fqnt=MTF0dTMwY2l1dXhkbQ%3D%3D&utm_source=qr'
    },
    {
        nome: 'Augustho Guilherme Gonçalves Silva',
        funcao: 'Equipe de desenvolvimento',
        foto: '',
        rede: 'github',
        link: ''
    },
    {
        nome: 'Camylla Magalhães Sousa',
        funcao: 'Equipe de desenvolvimento',
        foto: '',
        rede: 'linkedin',
        link: 'https://www.linkedin.com/in/camylla-magalhaes-sousa-21b456277/'
    },
    {
        nome: 'Miguel Marcos Silva',
        funcao: 'Equipe de desenvolvimento',
        foto: '',
        rede: 'linkedin',
        link: ''
    },
    {
        nome: 'Vinícius Nascentes Nascimento',
        funcao: 'Equipe de desenvolvimento',
        foto: '',
        rede: 'github',
        link: ''
    }
];


/* ==============================
   ÍCONES DAS REDES SOCIAIS
================================ */

const redes = {
    instagram: {
        nome: 'Instagram',
        icone: `
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <path d="M17.5 6.5h.01"/>
        `
    },

    linkedin: {
        nome: 'LinkedIn',
        icone: `
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M7 10v7M7 7h.01M11 17v-7m0 3a3 3 0 0 1 6 0v4"/>
        `
    },

    github: {
        nome: 'GitHub',
        icone: `
            <path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6-1.6 6-6A4.7 4.7 0 0 0 18.7 6 4.4 4.4 0 0 0 18.6 2S17.4 1.6 15 3.5a13 13 0 0 0-6 0C6.6 1.6 5.4 2 5.4 2A4.4 4.4 0 0 0 5.3 6 4.7 4.7 0 0 0 4 9.3c0 4.4 2.7 5.6 6 6A3.5 3.5 0 0 0 9 18v4"/>
        `
    }
};


/* ==============================
   VALIDAÇÃO DOS LINKS
================================ */

function validarLink(url) {
    try {
        return new URL(url).protocol === 'https:';
    } catch {
        return false;
    }
}


/* ==============================
   EXIBIÇÃO DOS INTEGRANTES
================================ */

function carregarEquipe() {

    const equipe = document.querySelector('#team');

    equipe.innerHTML = '';

    integrantes.forEach(integrante => {

        const rede = redes[integrante.rede];

        const iniciais = integrante.nome
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(nome => nome[0])
            .join('')
            .toUpperCase();

        // Criação do card

        const card = document.createElement('article');
        card.className = 'member';

        card.innerHTML = `
            <div class="person">
                <div class="avatar"></div>

                <div>
                    <h3></h3>
                    <p></p>
                </div>
            </div>

            <div class="links"></div>
        `;

        // Nome e função

        card.querySelector('h3').textContent =
            integrante.nome;

        card.querySelector('p').textContent =
            integrante.funcao;

        // Foto ou iniciais

        const avatar = card.querySelector('.avatar');

        avatar.textContent = iniciais;

        if (integrante.foto) {

            const imagem = document.createElement('img');

            imagem.className = 'avatar';
            imagem.src = integrante.foto;
            imagem.alt = integrante.nome;

            imagem.addEventListener('error', () => {
                imagem.replaceWith(avatar);
            });

            avatar.replaceWith(imagem);
        }

        // Botão da rede social

        if (rede) {

            const ativo = validarLink(integrante.link);

            const botao = document.createElement(
                ativo ? 'a' : 'span'
            );

            botao.className = ativo
                ? 'social'
                : 'social unavailable';

            if (ativo) {
                botao.href = integrante.link;
                botao.target = '_blank';
                botao.rel = 'noopener noreferrer';
            } else {
                botao.title = 'Link ainda não cadastrado';
            }

            botao.innerHTML = `
                <svg viewBox="0 0 24 24"
                     aria-hidden="true">
                    ${rede.icone}
                </svg>

                <span>${rede.nome}</span>
            `;

            card.querySelector('.links').append(botao);
        }

        equipe.append(card);

    });

}


/* ==============================
   INICIALIZAÇÃO DO SITE
================================ */

function iniciarSite() {

    carregarEquipe();

    const ano = document.querySelector('#year');

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

}

if (document.readyState === 'loading') {
    document.addEventListener(
        'DOMContentLoaded',
        iniciarSite
    );
} else {
    iniciarSite();
}
