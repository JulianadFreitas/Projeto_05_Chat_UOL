guardaNome();

function chama() {
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promessa.then(chargeMessages);
}

function guardaNome() {
    const nome = prompt("Dgite seu nome");
    let nomeDado = {
        name: nome
    };
    const envioNome = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeDado);

    envioNome.then(sucess);
    envioNome.catch(failed);

    function sucess() {
        alert("Nome aceito");
        setTimeout(chama, 3000);
    }

    function failed() {
        const nome = prompt("Digite outro nome pois este já está em uso");
        let nomeDado = {
            name: nome
        };
        const envioNome = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeDado);

        envioNome.then(sucess);
        envioNome.catch(failed);
    }
}

function chargeMessages(dados) {
    console.log(dados);
    rendereziMensagens(dados.data);
}

function rendereziMensagens(parametro) {
    const messages = document.querySelector(".messages");
    messages.innerHTML += "";

    for (let i = 0; i < parametro.length; i++) {

        if (parametro[i].type == "status") {
            messages.innerHTML += `<div class="message status">  ${parametro[i].time} <strong>  ${parametro[i].from} </strong>${parametro[i].text}</div>`;
        } else if (parametro[i].type == "message") {
            messages.innerHTML += `<div class="message"> ${parametro[i].time} <strong>${parametro[i].from}  para ${parametro[i].to}: </strong>${parametro[i].text}</div>`;
        } else if (parametro[i].type == "private_message") {
            messages.innerHTML += `<div class="message reservada">${parametro[i].time}<strong>${parametroa[i].from}</strong>reservadamente para <strong>${parametro[i].to}:</strong>${parametro[i].text}</div>`;
        } else {
            messages.innerHTML += "";
        }
    }
    window.scrollTo(0, document.body.scrollHeight);
}
//onclick dos participantes no botao dos bonequinhos
function participants() {
    const buttonParticipants = document.querySelector(".top .button");
    const show = document.querySelector(".mask");
    show.classList.remove("hidden");
    console.log(buttonParticipants);
}