/*=============== SHOW MENU ===============*/

/*=============== SWIPER MOVIE ===============*/
let swiperMovie = new Swiper(".movie__swiper", {
  loop: true,
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: 24,

  breakpoints: {
    440: {
      slidesPerView: "auto",
    },
    768: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});

/*=============== SWIPER NEW ===============*/
let swiperNew = new Swiper(".new__swiper", {
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 2,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    440: {
      centeredSlides: false,
      slidesPerView: "auto",
    },
    768: {
      centeredSlides: false,
      slidesPerView: 4,
    },
    1200: {
      centeredSlides: false,
      slidesPerView: 5,
    },
  },
});

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById("header");
  // Add a class if the bottom offset is greater than 50 of the viewport
  this.scrollY >= 50
    ? header.classList.add("blur-header")
    : header.classList.remove("blur-header");
};
window.addEventListener("scroll", blurHeader);

// CARD
// JavaScript to handle card opening, closing, and content update

function showCard(title, subtitle, description) {
  // Set the card content based on the course clicked
  document.getElementById("card-title").innerText = title;
  document.getElementById("card-subtitle").innerText = subtitle;
  document.getElementById("card-desc").innerText = description;

  // Show the card and overlay
  document.getElementById("info-card").style.display = "block";
  document.getElementById("blur-overlay").style.display = "block";

  // Apply blur to the background (main content)
  document.querySelector("main").classList.add("blurred");
}

function closeCard() {
  // Hide the card and overlay
  document.getElementById("info-card").style.display = "none";
  document.getElementById("blur-overlay").style.display = "none";

  // Remove blur from the background (main content)
  document.querySelector("main").classList.remove("blurred");
}
// Função para rolar até o formulário e fechar o card
function acessarCurso() {
  // Fecha o card
  document.getElementById("info-card").style.display = "none";
  document.getElementById("blur-overlay").style.display = "none";

  // Remove o blur do fundo
  document.querySelector("main").classList.remove("blurred");

  // Rolar até o formulário
  document
    .getElementById("form-section")
    .scrollIntoView({ behavior: "smooth" });
}

// Adicionando o evento ao botão "Acessar Curso"
document
  .getElementById("card-action-btn")
  .addEventListener("click", acessarCurso);

// ===============FORM====================

// FORMATO DE NUMERO DE CONTATO
// Inicializa o Intl-Tel-Input no campo de telefone, limitando ao Brasil
const input = document.querySelector("#phone");
let previousValue = ""; // Armazena o valor anterior para detectar quando o usuário está apagando
let isDeleting = false; // Detecta se o usuário está apagando

const iti = window.intlTelInput(input, {
  initialCountry: "br", // Define o Brasil como país inicial
  separateDialCode: true, // Mostra o código do país separadamente
  onlyCountries: ["br"], // Limita para o Brasil
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// Função para formatar o telefone conforme o usuário digita, sem o código +55
input.addEventListener("input", function (e) {
  let phoneNumber = input.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  let formattedPhone = "";

  // Verifica se o usuário está apagando
  if (phoneNumber.length < previousValue.length) {
    isDeleting = true; // Ativa a flag para detectar deleção
  } else {
    isDeleting = false; // O usuário está digitando
  }

  // Se o usuário está apagando, mostra apenas os números sem formatação
  if (isDeleting) {
    input.value = phoneNumber; // Mostra o número sem formatação
    previousValue = phoneNumber; // Atualiza o valor anterior
    return; // Não aplica formatação
  }

  // Aplica a formatação conforme o número é digitado
  if (phoneNumber.length > 0) {
    formattedPhone += "(" + phoneNumber.substring(0, 2) + ") "; // Código de área
  }
  if (phoneNumber.length > 2) {
    formattedPhone += phoneNumber.substring(2, 3) + " "; // Primeiro dígito do número
  }
  if (phoneNumber.length > 3) {
    formattedPhone += phoneNumber.substring(3, 7) + "-"; // Primeira parte do número
  }
  if (phoneNumber.length > 7) {
    formattedPhone += phoneNumber.substring(7, 11); // Segunda parte do número
  }

  // Atualiza o valor do input com o número formatado
  input.value = formattedPhone;
  previousValue = phoneNumber; // Atualiza o valor anterior
});

// Evento para garantir que o +55 não seja digitado no campo de telefone
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const checkbox = document.getElementById("cbx-46");
  if (!checkbox.checked) {
    alert("Você deve concordar com o envio do formulário.");
    return;
  }

  // Coletar os dados do formulário
  const formData = new FormData();
  formData.append("from_name", document.getElementById("fullName").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("phone", document.getElementById("phone").value);
  formData.append("rua", document.getElementById("rua").value);
  formData.append("bairro", document.getElementById("bairro").value);
  formData.append("cidade", document.getElementById("cidade").value);
  formData.append("estado", document.getElementById("estado").value);
  formData.append(
    "trabalhando",
    document.querySelector('input[name="value-radio"]:checked').value
  );

  // Configurar os parâmetros do EmailJS
  const templateParams = {
    from_name: document.getElementById("fullName").value,
    to_name: "Recrutador",
    message: `Telefone: ${
      document.getElementById("phone").value
    }\nEndereço: Rua ${document.getElementById("rua").value}, Bairro ${
      document.getElementById("bairro").value
    }, Cidade ${document.getElementById("cidade").value}, Estado ${
      document.getElementById("estado").value
    }\nEstá trabalhando: ${
      document.querySelector('input[name="value-radio"]:checked').value
    }`,
    email: document.getElementById("email").value,
  };

  // Enviar o email sem anexo
  emailjs.send("service_53zh8sp", "template_r3220ww", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      document.getElementById("myForm").reset(); // Reseta o formulário
      document.getElementById("message").style.display = "block"; // Exibe a mensagem de sucesso
    },
    function (error) {
      console.log("FAILED...", error);
      alert("O envio do formulário falhou, tente novamente.");
    }
  );
});

// Função para o cronômetro de 24 horas
// Função para salvar o tempo restante no LocalStorage
function salvarTempoRestante(tempo) {
  localStorage.setItem("tempoRestante", tempo);
}

// Função para carregar o tempo restante do LocalStorage
function carregarTempoRestante() {
  const tempoSalvo = localStorage.getItem("tempoRestante");
  return tempoSalvo ? parseInt(tempoSalvo) : 24 * 60 * 60; // Se não houver tempo salvo, volta a 24h
}

// Função para o cronômetro de 24 horas
function iniciarCronometro() {
  const cronometroElement = document.getElementById("cronometro");
  let tempoRestante = carregarTempoRestante(); // Carrega o tempo salvo

  const intervalo = setInterval(() => {
    const horas = Math.floor(tempoRestante / 3600);
    const minutos = Math.floor((tempoRestante % 3600) / 60);
    const segundos = tempoRestante % 60;

    // Atualiza o cronômetro no HTML
    cronometroElement.innerHTML = `Tempo Restante: ${horas}h ${minutos}m ${segundos}s`;

    // Salva o tempo restante no LocalStorage a cada segundo
    salvarTempoRestante(tempoRestante);

    // Quando o tempo acabar
    if (tempoRestante <= 0) {
      clearInterval(intervalo);
      cronometroElement.innerHTML = "Tempo Esgotado!";
      localStorage.removeItem("tempoRestante"); // Remove o tempo salvo quando acaba
    }

    tempoRestante--;
  }, 1000); // Atualiza a cada segundo
}

// Função para simular cadastros aleatórios
function simularCadastros() {
  const nomes = [
    "Fernanda",
    "Marcos",
    "Vitor",
    "Maria",
    "João",
    "Ana",
    "Paulo",
    "Mateus",
    "Gustavo",
    "Andressa",
    "Mônica",
    "Douglas",
    "Laura",
    "Paula",
    "Tiago",
    "Leonardo",
    "Alex",
    "Julia",
  ];

  const notificacoesElement = document.getElementById("notificacoes");

  // Lista de tempos diferentes para aumentar a aleatoriedade
  const intervalos = [7, 12, 18, 25, 30]; // Segundos variados

  function gerarNotificacao() {
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    const intervaloAleatorio =
      intervalos[Math.floor(Math.random() * intervalos.length)]; // Escolhe um tempo aleatório da lista

    setTimeout(() => {
      const notificacao = document.createElement("p");
      notificacao.innerText = `${nomeAleatorio} se cadastrou agora!`;
      notificacoesElement.appendChild(notificacao);

      // Remove a notificação após 5 segundos
      setTimeout(() => {
        notificacao.remove();
      }, 5000);

      gerarNotificacao(); // Gera a próxima notificação
    }, intervaloAleatorio * 1000); // Define o intervalo para exibir a próxima notificação
  }

  gerarNotificacao(); // Inicia a primeira notificação
}

// Iniciar cronômetro e cadastros
iniciarCronometro();
simularCadastros();
