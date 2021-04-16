let nome;
guardaNome();

function guardaNome() {
    nome = prompt("Dgite seu nome");
    let nomeDado = {
        name: nome
    };

    const envioNome = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeDado);

    envioNome.then(sucess);
    envioNome.catch(failed);

    function sucess() {
        alert("Nome aceito");
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

chama()
setInterval(chama, 3000);

function chama() {
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promessa.then(chargeMessages);
}

function chargeMessages(dados) {
    resposta = dados.data;
    rendereziMensagens();
}

function rendereziMensagens() {
    const messages = document.querySelector(".messages");
    messages.innerHTML = "";

    for (let i = 0; i < resposta.length; i++) {

        if (resposta[i].type == "status") {
            messages.innerHTML += `<div class="message status"> <p> <span class="time">&nbsp;${resposta[i].time}&nbsp;</span></p><span class="name">${resposta[i].from}&nbsp;</span> ${resposta[i].text} </div>`;
        } else if (resposta[i].type == "message") {
            messages.innerHTML += `<div class="message"> <p> <span class="time">&nbsp;${resposta[i].time}&nbsp;</span></p><span class="name">${resposta[i].from}&nbsp;</span>para<span class="name">&nbsp;${resposta[i].to}</span><span>:&nbsp;${resposta[i].text} </div>`;
        } else if (resposta[i].type == "private_message" && nome === resposta[i].to) {
            messages.innerHTML += `<div class="message reservada"><p> <span class="time">&nbsp;${resposta[i].time} <span class="name">${resposta[i].from}&nbsp;</span>reservadamente para &nbsp;<span class="name"> ${resposta[i].to}:</span>${resposta[i].text}</div>`;
        }
    }
    window.scrollTo(0, document.body.scrollHeight);
}

setInterval(mantemConectado, 2000);

function mantemConectado() {
    let nomeDado = {
        name: nome
    };
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", nomeDado);
    console.log(nomeDado)
}

function sendMessage() {
    const text = document.querySelector(".areaMessage");
    const textMessage = {
		from: nome,
		to: "Todos",
		text: text.value,
		type: "message" 
	 };
     console.log(textMessage);
     const sendMessages = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", textMessage);
     console.log(textMessage);
     text.value="";
     sendMessages.then(sucess);
     sendMessages.catch(failed);

     function sucess() {
         sendMessages
    }
    function failed() {
        alert("Sua mensagem não pode ser enviada. Algo deu errado :/");
        window.location.reload();
    }
}


function participants() {
    const buttonParticipants = document.querySelector(".top .button");
    const show = document.querySelector(".mask");
    show.classList.remove("hidden");
    console.log(buttonParticipants);
}

function back() {
    const buttonback = document.querySelector(".mask");
    buttonback.classList.add("hidden");
    console.log(buttonback);
}