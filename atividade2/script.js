const botao = document.getElementById('btn');
const inputCep = document.getElementById('cep');
const mensagem = document.getElementById('mensagem');
const cepRes = document.getElementById('cep-res');
const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const temaToggle = document.getElementById('tema');

botao.addEventListener('click', function () {
    const cep = inputCep.value.trim();


    if (!/^\d{8}$/.test(cep)) {
        mensagem.textContent = 'Digite um CEP válido com 8 números!';
        mensagem.className = 'erro';
        limparResultado();
        return;
    }

    mensagem.textContent = 'Consultando...';
    mensagem.className = '';

    fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('CEP não encontrado.');
            }
            return response.json();
        })
        .then(data => {
            mensagem.textContent = 'Consulta realizada com sucesso!';
            mensagem.className = 'sucesso';
            cepRes.textContent = data.cep || 'Não informado';
            logradouro.textContent = data.street || 'Não informado';
            bairro.textContent = data.neighborhood || 'Não informado';
            cidade.textContent = data.city || 'Não informado';
            estado.textContent = data.state || 'Não informado';
        })
        .catch(error => {
            mensagem.textContent = error.message;
            mensagem.className = 'erro';
            limparResultado();
        });
});

function limparResultado() {
    cepRes.textContent = '';
    logradouro.textContent = '';
    bairro.textContent = '';
    cidade.textContent = '';
    estado.textContent = '';
}


temaToggle.addEventListener('change', function () {
    document.body.classList.toggle('dark', temaToggle.checked);
});
