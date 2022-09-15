// const urlCameras = `${URL}/api/cameras`;

function fazGet(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
}

function main() {
    const result = fazGet(urlCameras);

    const data = JSON.parse(result);
    const cameras = data.result;

    let tabela = document.getElementById('tabela');
    cameras.forEach((camera) => {
        let linha = listaTabela(camera);
        tabela.appendChild(linha);
    });
    return cameras;
}
main();

function listaTabela(camera) {
    linha = document.createElement('tr');
    tdID = document.createElement('td');
    tdnome = document.createElement('td');
    tdtoken = document.createElement('td');
    tdacoes = document.createElement('td');

    tdID.innerHTML = camera.codigo;
    tdnome.innerHTML = camera.nome;
    tdtoken.innerHTML = camera.token;
    tdacoes.innerHTML = `<button type="button" onclick="editCamera(${camera.codigo})" class="editBtn" style="margin-right:5px" >editar</button><button type="button" onclick="deleteCamera(this)" class="removeBtn" style="margin-right:5px" data-camera_id="${camera.codigo}">excluir</button>`;
    linha.appendChild(tdID);
    linha.appendChild(tdnome);
    linha.appendChild(tdtoken);
    linha.appendChild(tdacoes);

    return linha;
}
var variavel;
function Cancelar() {
    document.location.reload(true);
}
function addNewCamera() {
    const envio = addCamera();

    console.log(envio);
    if (envio == undefined) {
    } else {
        let request = new XMLHttpRequest(); //criar uma instacia de comunicação cliente e servidor
        request.open('POST', urlCameras, true); //inicializa uma solitação criada
        request.setRequestHeader(
            'Content-Type',
            'application/json;charset=UTF-8',
        );
        request.send(JSON.stringify({ nome: envio.nome, token: envio.token }));
        document.location.reload(true);
    }
}

// return

function addCamera() {
    let nome = document.getElementById('camera').value;
    let token = document.getElementById('token').value;
    if (nome === '' || token === '') {
        alert('preencha o campo');
    } else {
        const dadosCamera = {
            nome: nome,
            token: token,
        };

        alert('Camera cadastrada');

        return dadosCamera;
    }
}

function updateCamera() {
    //Obter valores dos campos do formulario da camera o
    //campos: Id, Camera, token o
    const newNome = document.getElementById('camera').value;
    const newToken = document.getElementById('token').value;
    const id = document.getElementById('idCrud').value;

    //Criar objeto para ser enviado na requisição PUT da api o
    //ao finalizar:

    let dadosObj = {
        nome: newNome,
        token: newToken,
    };
    let request = new XMLHttpRequest(); //criar uma instacia de comunicação cliente e servidor
    request.open('PUT', `${urlCameras}/${id}`, true); //inicializa uma solitação criada
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(
        JSON.stringify({ nome: dadosObj.nome, token: dadosObj.token }),
    );

    document.getElementById('camera').value = '';
    document.getElementById('token').value = '';
    document.getElementById('idCrud').value = '';

    //mudar funcao onclick do button updateCamera() para addNewCamera()
    document.getElementById('salvar').innerText = 'Salvar';
    document.getElementById('salvar').setAttribute('onclick', 'addNewCamera()');
    document.location.reload(true);
    //atualizar pagina

    var btnCrud = document.getElementById('btnEnvio');
    btnCrud.addEventListener('click', function () {
        document.getElementById('divCrud').focus();
    });
}

function editCamera(id) {
    let request = new XMLHttpRequest(); //criar uma instacia de comunicação cliente e servidor
    request.open('GET', `${urlCameras}/${id}`, false); //inicializa uma solitação criada

    request.send();
    console.log(request.responseText);
    const data = JSON.parse(request.responseText);
    const camera = data.result;

    document.getElementById('camera').value = camera.nome;
    document.getElementById('token').value = camera.token;
    document.getElementById('idCrud').value = id;
    document.getElementById('salvar').innerText = 'Atualizar';
    document.getElementById('salvar').setAttribute('onclick', 'updateCamera()');
    window.scrollTo(0, 0);
}

function deleteCamera(element) {
    const id = element.dataset.camera_id;

    var r = confirm('Excluir camera?');
    if (r == true) {
        let request = new XMLHttpRequest(); //criar uma instacia de comunicação cliente e servidor
        request.open('DELETE', `${urlCameras}/${id}`, true); //inicializa uma solitação criada
        request.setRequestHeader(
            'Content-Type',
            'application/json;charset=UTF-8',
        );
        request.send(JSON.stringify({ codigo: id }));

        alert(JSON.stringify('camera deletada'));
        document.location.reload(true);
    } else {
        id = cancelar();
    }
}
