function iniciarMagia() {
    const portal = document.getElementById('portal');
    const stage = document.getElementById('main-stage');
    const final = document.getElementById('etapa-final');
    const btnSom = document.getElementById('controle-som');

    // Referências de áudio
    const somClique = document.getElementById('som-clique');
    const somPorta = document.getElementById('som-porta');
    const musicaFesta = document.getElementById('musica-festa');

    // TRUQUE PARA IPHONE: Inicia a música da festa "muda" no primeiro clique
    // Isso faz o iOS entender que o usuário autorizou este áudio específico
    musicaFesta.play().then(() => {
        musicaFesta.pause();
        musicaFesta.currentTime = 0;
    }).catch(e => console.log("Aguardando interação"));

    // Inicia os sons da primeira parte
    somClique.play();
    portal.classList.add('aberto');

    setTimeout(() => {
        somPorta.play();
    }, 500);

    // Efeito de Clarão e Explosão
    setTimeout(() => {
        document.getElementById('clarão-luxo').classList.add('ativo');
        document.getElementById('explosao-texto').classList.add('ativo');

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ffffff', '#fcf6ba', '#bf953f']
            });
        }
    }, 6000);

    // Limpeza da primeira etapa
    setTimeout(() => {
        document.getElementById('clarão-luxo').classList.remove('ativo');
        document.getElementById('explosao-texto').classList.remove('ativo');
        stage.style.display = 'none';
    }, 9500);

    // ENTRADA DA SEGUNDA PARTE
    setTimeout(() => {
        final.style.display = 'flex';

        setTimeout(() => {
            final.classList.add('visivel');
            iniciarCarrossel();
        }, 50);

        // Ativa o botão de controle e TOCA A MÚSICA
        btnSom.style.display = 'flex';

        const promessaPlay = musicaFesta.play();
        if (promessaPlay !== undefined) {
            promessaPlay.catch(error => {
                console.log("iPhone bloqueou o autoplay. O usuário precisará tocar no ícone de som.");
            });
        }
    }, 10500);
}

function iniciarCarrossel() {
    const fotos = document.querySelectorAll('.foto-carrossel');
    let index = 0;
    if (fotos.length < 2) return;

    setInterval(() => {
        fotos[index].classList.remove('active');
        index = (index + 1) % fotos.length;
        fotos[index].classList.add('active');
    }, 4000);
}

function alternarSom() {
    const musica = document.getElementById('musica-festa');
    const btn = document.getElementById('controle-som');

    if (musica.paused) {
        musica.play();
        btn.innerHTML = "🔊";
    } else {
        musica.pause();
        btn.innerHTML = "🔇";
    }
}

function voltarParaBotoes() {
    document.getElementById('area-botoes')?.scrollIntoView({ behavior: 'smooth' });
}

function abrirPresentes() {
    document.getElementById('popup').style.display = 'flex';
}

function fecharPresentes() {
    document.getElementById('popup').style.display = 'none';
}

function copiarChavePix() {
    const chave = '48996612459';

    navigator.clipboard.writeText(chave).then(() => {
        const toast = document.getElementById('toastPix');
        toast.style.display = 'block';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    }).catch(() => {
        alert('Não foi possível copiar a chave Pix.');
    });
}
