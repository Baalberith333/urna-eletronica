let numeroDigitado = '';
let candidatos = {
  "13": { nome: "Lula", partido: "PT", foto: "https://files.sunoresearch.com.br/n/uploads/2022/10/Lula-eleito.jpg" },
  "22": { nome: "Bolsonaro", partido: "PL", foto: "imagens/bolsonaro.jpg" },
  "45": { nome: "Ciro Gomes", partido: "PDT", foto: "imagens/ciro.jpg" },
  "41": { nome: "Junior Negão", partido: "666", foto: "imagens/junior.jpg" },
  "35": { nome: "Waleria Soares", partido: "PPP", foto: "imagens/waleria.jpg" },
  "44": { nome: "Julia Lucila", partido: "pppp", foto: "imagens/julinha.jpg" },
  "11": { nome: "Hugo Carlos", partido: "MM", foto: "imagens/hugo.jpg" },
  "24": { nome: "J.J", partido: "COCO", foto: "imagens/jj.gif" },
  "33": { nome: "Moana", partido: "MN", foto: "imagens/moana.jpg" },
  "42": { nome: "Barbie", partido: "BB", foto: "imagens/barbie.jpg" }
};

function tecla(n) {
  if (numeroDigitado.length < 2) {
    numeroDigitado += n;
    document.getElementById('logo').classList.add('hidden');
    atualizaTela();
    limpaMensagem();
  }
}

function atualizaTela() {
  const tela = document.getElementById('tela');
  tela.textContent = `Número: ${numeroDigitado}`;
  const info = document.getElementById('info-candidato');
  const candidato = candidatos[numeroDigitado];

  if (numeroDigitado.length === 2) {
    if (candidato) {
      info.innerHTML = `
        <p>Nome: ${candidato.nome}</p>
        <p>Partido: ${candidato.partido}</p>
        <img src="${candidato.foto}" alt="Foto do candidato" class="foto-candidato">
      `;
    } else {
      info.innerHTML = '<p><strong>Voto Nulo</strong></p>';
    }
  } else {
    info.innerHTML = '';
  }
}

function branco() {
  numeroDigitado = 'BRANCO';
  document.getElementById('tela').textContent = 'VOTO EM BRANCO';
  document.getElementById('info-candidato').innerHTML = '';
  document.getElementById('logo').classList.add('hidden');
  mostrarMensagem('Você escolheu VOTO EM BRANCO. Pressione CONFIRMA.');
}

function corrige() {
  numeroDigitado = '';
  document.getElementById('tela').textContent = 'Digite o número do candidato:';
  document.getElementById('info-candidato').innerHTML = '';
  document.getElementById('logo').classList.remove('hidden');
  mostrarMensagem('Entrada limpa. Digite novamente.');
}

function confirma() {
  if (numeroDigitado === '') {
    mostrarMensagem('Nenhum número digitado.');

    const audio = document.getElementById("som-plim");
    if (audio) {
      audio.play().catch(error => {
        console.error("Erro ao tocar o áudio:", error);
      });
    }

    return;
  }

  const audio = document.getElementById("som-plim");
  if (audio) {
    audio.play().catch(error => {
      console.error("Erro ao tocar o áudio:", error);
    });
  }

  if (numeroDigitado === 'BRANCO') {
    mostrarMensagem('Voto em branco CONFIRMADO.');
  } else if (numeroDigitado.length === 2) {
    const candidato = candidatos[numeroDigitado];
    if (candidato) {
      mostrarMensagem(`Voto CONFIRMADO para ${candidato.nome}.`);
    } else {
      mostrarMensagem('Voto NULO CONFIRMADO.');
    }
  } else {
    mostrarMensagem('Número incompleto. Corrija.');
    return;
  }

  setTimeout(() => {
    corrige();
    document.getElementById('logo').classList.remove('hidden');
  }, 2000);
}

function mostrarMensagem(texto) {
  document.getElementById('mensagem').textContent = texto;
}

function limpaMensagem() {
  document.getElementById('mensagem').textContent = '';
}