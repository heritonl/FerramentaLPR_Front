// const urlGet = `${URL}/api/cameras`;
// const urlPost = `${URL}/api/envio`;
var btnEnvio = document.getElementById('btnEnvio');

function fazGet(urlGet) {
    let request = new XMLHttpRequest(); //criar uma instacia de comunicação cliente e servidor
    request.open('GET', urlGet, false);
    request.onload = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                console.log('select ok');
            } else {
                console.error(request.statusText);
            }
        }
    };
    request.onerror = function (e) {
        console.error(request.statusText);
    }; //inicializa uma solitação criada
    request.send(); //método não retornará até que a resposta seja recebida
    return request.responseText; //retorna um texto
}

function main() {
    const result = fazGet(urlGet); //guardando o retorno na minha constante result
    const data = JSON.parse(result); //constroi um valou ou objeto para string
    const cameras = data.result; //pega o result do data do meu json
    const selectElement = document.querySelector('.tokenSimul'); //selecionar o primeiro elemento

    for (var i = 0; i < cameras.length; i++) {
        //vai fazer a varredura na quantidade do array
        let option = document.createElement('option'); //vai criar um elemento option
        option.classList.add('selectOption'); //vai criar classe no option
        option.text = cameras[i].nome; //vai atribuir no text nome
        option.value = cameras[i].token; //vai atribuir no valor o token

        selectElement.appendChild(option); //vai atribui ao filho o text e valor do option
    }
}
main();

btnEnvio.addEventListener('click', () => {
    const registro = document.getElementById('Registro').value; //input id Registro e atribui na variavel
    const intervalo = document.getElementById('Intervalo').value; //input id Registro e atribui na variavel
    var token = document.querySelector('.tokenSimul').value; //vai pegar o primeiro elemento com o nome

    if (registro === '' || intervalo === '') {
        //vai fazer a verificação se o campo esta vazio
        alert('preencha o campo');
    } else {
        if (intervalo >= 100) {
            //se o intervalo for > 100 vai executar a função
            var somaIntervalo = 0; //inicializa somaIntervalo com 0
            let i = 0; //inicializa i com 0
            const divResponse = document.querySelector('#response');
            const interval = setInterval(async () => {
                i++;
                let request = new XMLHttpRequest(); //criar uma instacia de comunicação cliente e servidor
                request.open('POST', urlPost, false); //inicializa uma solitação criada
                request.setRequestHeader(
                    'Content-Type',
                    'application/json;charset=UTF-8',
                );
                request.onload = function (e) {
                    if (request.readyState === 4) {
                        //verifica se readyState é == 4(Operação concluída.)
                    } else {
                        console.error(request.statusText);
                    }
                };
                request.onerror = function (e) {
                    console.error(request.responseText);
                };
                request.send(JSON.stringify({ token: token })); //enviando um token em formato de json

                const data = JSON.parse(request.responseText); //guarda
                somaIntervalo += parseInt(intervalo);

                const response = document.createElement('div');
                response.classList.add('divResponse');
                console.log(request.responseText);

                response.innerHTML = ` Intervalo MS: ${somaIntervalo} - Placa: ${data.license_plate} - Data do envio: ${data.measured_at} - Time de retorno do servidor: ${data.response}`;

                divResponse.appendChild(response);

                document.getElementById('Registro').value = ''; //input id Registro e atribui na variavel
                document.getElementById('Intervalo').value = ''; //input id Registro e atribui na variavel

                if (registro == i) {
                    clearInterval(interval);
                }
            }, intervalo);
            divResponse.innerHTML = '';
        } else {
            alert('Quantidade de milissegundos invalido!');
        }
    }
});

var btnSimul = document.getElementById('btnSimul');
var btnCrud = document.getElementById('btnCrud');
var simulacao = document.querySelector('.divSimul');
var crud = document.querySelector('.divCrud');

btnCrud.addEventListener('click', function () {
    crud.style.display = 'block';
    simulacao.style.display = 'none';
});

btnSimul.addEventListener('click', function () {
    simulacao.style.display = 'block';
    crud.style.display = 'none';
});
