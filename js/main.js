var canvas = document.getElementById('areaDesenho');
var ctx = canvas.getContext('2d');

// Posicionamento
var posX = 150;
var posY = 70;
let angulo = 0;
// Escalas iniciais dos elementos
let largura = 50; 
let altura = 33;
let raio = 25; 
let baseTriangulo = 50;
let alturaTriangulo = 33;

// Fatores de escala para redimensionamento
let fatorEscalaMaior = 1.1;
let fatorEscalaMenor = 0.9;

// Função para mover o elemento para cima
function moverCima() {
    posY -= 5;
    desenharElemento();
}

// Função para mover o elemento para baixo
function moverBaixo() {
    posY += 5;
    desenharElemento();
}

// Função para mover o elemento para a esquerda
function moverEsquerda() {
    posX -= 5;
    desenharElemento();
}

// Função para mover o elemento para a direita
function moverDireita() {
    posX += 5;
    desenharElemento();
}

// Função para rotacionar o elemento para a direita
function rotacionarDireita(){
    angulo += 5; 
    desenharElemento();
} 

// Função para rotacionar o elemento para a esquerda
function rotacionarEsquerda(){
    angulo -= 5; 
    desenharElemento();
}

// Função para redimensionar o elemento para mais
function redimensionarMais(){
    let inputEscala = document.getElementById('inputEscala');
    let valorEscala = Number(inputEscala.value);
    valorEscala += 0.1;
    inputEscala.value = valorEscala.toFixed(1);
    desenharElemento();
}

// Função para redimensionar o elemento para menos
function redimensionarMenos(){
    let inputEscala = document.getElementById('inputEscala');
    let valorEscala = Number(inputEscala.value);
    valorEscala -= 0.1;
    if (valorEscala < 0.1) {
        valorEscala = 0.1;
    }
    inputEscala.value = valorEscala.toFixed(1);
    desenharElemento();
}

// Função para escalar o elemento
function escalarElemento(value){
    var inputEscala = document.getElementById('inputEscala').value;
    return value * inputEscala;
}

// Desenha o elemento no canvas
function desenharElemento() {
    // Define o tipo de elemento a ser desenhado
    var tipoElemento = document.getElementById('tipoElemento').value;
    // Define as cores do elemento
    var corElemento1 = document.getElementById('corElemento').value;
    var corElemento2 = document.getElementById('corElemento2').value;
    // Define o nivel de gradiente (caso for 0, terá cor sólida)
    var gRange = document.getElementById('gradientRange').value;
    
    // Inicializa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(posX, posY);
    ctx.rotate(angulo * Math.PI / 180);
    ctx.beginPath();

    // Define se o elemento terá gradiente ou cor sólida
    if(gRange >= 1){
        var grad = ctx.createLinearGradient(-canvas.width / gRange, 0, canvas.width / gRange, 0);
        grad.addColorStop(0, corElemento1);
        grad.addColorStop(1, corElemento2);
        ctx.fillStyle = grad;
    } else {
        ctx.fillStyle = corElemento1;
    }

    // Desenha o elemento, conforme o tipo selecionado
    switch (tipoElemento) {
        case 'retangulo':
            ctx.rect(escalarElemento(-largura / 2), escalarElemento(-altura / 2), escalarElemento(largura), escalarElemento(altura)); // Desenha o retângulo em relação ao ponto de origem traduzido
            break;
        case 'circulo':
            ctx.arc(0, 0, escalarElemento(raio), 0, 2 * Math.PI); // Desenha o círculo em relação ao ponto de origem traduzido
            break;
        case 'triangulo':
            ctx.moveTo(escalarElemento(-baseTriangulo / 2), escalarElemento(-alturaTriangulo / 2));
            ctx.lineTo(escalarElemento(baseTriangulo / 2), escalarElemento(alturaTriangulo / 2));
            ctx.lineTo(escalarElemento(-baseTriangulo / 2), escalarElemento(alturaTriangulo / 2));
            ctx.closePath();
            break;
    }

    // Executa o desenho do elemento
    ctx.fill();
    ctx.restore();
}

// Observa os eventos de clique nos botões
document.getElementById('btnInserirElemento').addEventListener('click', desenharElemento);
document.getElementById('btnCima').addEventListener('click', moverCima);
document.getElementById('btnBaixo').addEventListener('click', moverBaixo);
document.getElementById('btnEsquerda').addEventListener('click', moverEsquerda);
document.getElementById('btnDireita').addEventListener('click', moverDireita);
document.getElementById('btnRotacionarDireita').addEventListener('click', rotacionarDireita);
document.getElementById('btnRotacionarEsquerda').addEventListener('click', rotacionarEsquerda);
document.getElementById('btnEscalaMais').addEventListener('click', redimensionarMais);
document.getElementById('btnEscalaMenos').addEventListener('click', redimensionarMenos);