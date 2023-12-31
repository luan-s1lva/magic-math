//Link do vídeo de explicação do jogo
//https://youtu.be/5bzWy02YTNE
class Escolha {
  constructor(name, posicaoY, posicaoX, altura, largura,resposta) {
    this.name = name;
    this.posicaoY = posicaoY;
    this.posicaoX = posicaoX;
    this.altura = altura;
    this.largura = largura;
    this.resposta = resposta;
  }
}

class Principal {
  constructor(x,y,largura,altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
  }
}

//Áudio
let pegar;


//Variável de nível
let dificuldades = ["Facil","Médio","Difícil"];
let nivel = dificuldades[0];

//Variável que para o relógio
let isClockRunning = false;

//Varáveis da pontuação
let pontuacao = 0;

//Varáveis do tempo
let tempo = 1;
let arrTempo = [];

//Váriavel do heroi
let hero;
let heroImages = [];
let newHeroImages = [];

//Array das respostas erradas
let arrWrongAnswers = [];

//Váriavel da escolha
let escolhaImg1;
let escolhaImg2;
let escolhaImg3;
let escolhaImg4;

//Objeto do Personagem Principal
let principal;

//Objeto das Esolhas
let escolha1;

let escolha2;
  
let escolha3;

let escolha4;

//Variáveis de detecção de colisão
let collide1 = false;

let collide2 = false;

let collide3 = false;

let collide4 = false;

let collideEquation1 = false;

let collideEquation2 = false;

let collideEquation3 = false;

let collideEquation4 = false;

//Array com os números da equação
let arrValores = [];

//Coordenadas da equação
let eqX = 140;
let eqY = 120;

// coordenadas dos botoes
var xbotao1, ybotao1;
var xbotao2, ybotao2;
var xbotao3, ybotao3;

// coordenadas do cursor 
var xcursor, ycursor;

// variavel de estado 
var estado, posiCursor;

// posição do cursor

var posiCursorb1 = 1;
var posiCursorb2 = 2;
var posiCursorb3 = 3;
var posiCursorb4 = 4;
var posiCursorb5 = 5;

function reset() {
  window.location.reload();  
}

function gerarNumeros () {
  //noLoop();
  let equacao = [];
  let arrConta = [];
  let valor1 = int(random(0,11));
  let valor2 = int(random(0,11));
  let valor3 = int(random(0,11));
  let valor4 = int(random(0,20));
  let valor5 = int(random(0,30));
  let conta = "";
  let resultado = 0;
  
  if (nivel === dificuldades[0]) {    
    let numero = round(random(1,4));
  
    switch(numero) {
      case 1:
        conta = `${valor1} + ${valor2} - ${valor3}`;
        arrConta = [valor1,valor2,valor3];
        resultado = valor1 + valor2 - valor3;    
        break;
      case 2:
        conta = `${valor1} - ${valor2} + ${valor3}`;
        arrConta = [valor1,valor2,valor3];
        resultado = valor1 - valor2 + valor3;    
        break;
      case 3:
        conta = `${valor1} + ${valor2} + ${valor3}`;
        arrConta = [valor1,valor2,valor3];
        resultado = valor1 + valor2 + valor3;   
        break;
      case 4:
        conta = `${valor1} - ${valor2} - ${valor3}`;
        arrConta = [valor1,valor2,valor3];
        resultado = valor1 - valor2 - valor3;    
        break;
      default:
        resultado = 0;
        break;
    }

    equacao = [conta, resultado];
  } else if (nivel === dificuldades[1]) {
    equacao = ["conta", 12];
  } else if (nivel === dificuldades[2]) {
    equacao = ["olá", "ameegan"];
  }
  
  return equacao;
}

function preload() {
    arrValores = gerarNumeros();

  imgGameOver = loadImage("QeMS.gif");
  imgNextLevel = loadImage("levelUp.jpg");
  
  heroImages = ['/assets/images/principal/tile000.png',
                '/assets/images/principal/tile001.png',
                '/assets/images/principal/tile002.png',
                '/assets/images/principal/tile003.png',
                '/assets/images/principal/tile004.png',
                '/assets/images/principal/tile005.png',
                '/assets/images/principal/tile006.png',
                '/assets/images/principal/tile007.png',
                '/assets/images/principal/tile008.png',
                '/assets/images/principal/tile009.png',
                '/assets/images/principal/tile010.png',
                '/assets/images/principal/tile011.png',
                '/assets/images/principal/tile012.png',
                '/assets/images/principal/tile013.png',
                '/assets/images/principal/tile014.png',
                '/assets/images/principal/tile015.png'];
  
  for (i = 0; i < heroImages.length; i++) {
    newHeroImages[i] = loadImage(heroImages[i]); 
  }
  
  escolhaImg1 = loadImage('assets/images/blocks/blue.png');
  escolhaImg2 = loadImage('assets/images/blocks/green.png');
  escolhaImg3 = loadImage('assets/images/blocks/red.png');
  escolhaImg4 = loadImage('assets/images/blocks/pink.png');
  
  hero = newHeroImages[8];
  
  let respCorreta = round(random(0,3));
  arrWrongAnswers[respCorreta] = arrValores[1];
  
    for (let i = 0; i < 4; i++) {
      
      if (i !== respCorreta) {
        arrWrongAnswers[i] = round(random(0,50));
      }
    }
  
  //Posição do Personagem Principal
   principal = new Principal(200,200,50,50);

  //Posição das Esolhas
   escolha1 = new Escolha('escolha1',350,100,40,40,arrWrongAnswers[0]);

   escolha2 = new Escolha('escolha2',350,200,40,40,arrWrongAnswers[1]);

   escolha3 = new Escolha('escolha3',350,300,40,40,arrWrongAnswers[2]);

   escolha4 = new Escolha('escolha4',350,400,40,40,arrWrongAnswers[3]);
  
  //Áudio
  soundFormats("wav");
  pegar = loadSound("assets/music/pickupCoin.wav");
  vencer = loadSound("assets/music/powerUp.wav");
  perder = loadSound("assets/music/laserShoot.wav");
}

var fundo;
var img1;
var img2;

function setup() {
  createCanvas(500, 500);
  
  xbotao1 = 160;
  ybotao1 = 150;
  
  xbotao2 = 160;
  ybotao2 = 250;
  
  xbotao3 = 160;
  ybotao3 = 350;
  
  xcursor = 160;
  ycursor = 150;
  
  estado = 1;
  posiCursor = 1;
  fundo = loadImage('fundo.avif');
  img1 = loadImage('manu.jpeg');
  img2 = loadImage('luan.jpeg');
}

function draw() {
  if(estado == 1){
    menu();
  }else if(estado == 2){
    jogar();
  }else if (estado == 3){
    instrucoes();
  }else if(estado == 4){
    creditos();
  }

}

function menu(){
  background(fundo, 70);
  stroke(0,0,0);
  fill(0,0,0);
  strokeWeight(1);
  fill(255,215,0);
  textSize(60);
  textFont('georgia');
  text('MAGIC MATH',46,100);
  
  //desenho do botao 1
  fill(255,215,0);
  rect(xbotao1, ybotao1, 190,50,190,50);
  fill(0,0,0);
  textSize(30);
  text("Jogar", xbotao1+50-2, ybotao1+30+6);
  
  fill(255,215,0);
  rect(xbotao2, ybotao2, 190,50,190,50);
  fill(0,0,0);
  textSize(30);
  text("Instruções", xbotao2+50-20, ybotao2+30+6);

  fill(255,215,0);
  rect(xbotao3, ybotao3, 190,50,190,50);
  fill(0,0,0);
  textSize(30);
  text("Créditos", xbotao3+50-18, ybotao3+30+6);
  
  noFill(0);
  stroke(255,105,180);
  strokeWeight(9);
  rect(xcursor, ycursor, 190, 50,190,50);
}

function gameOver () {
  //vencer.stop();
  //pegar.stop();
  noLoop();
  perder.play();
  
  let largura = width;
  let altura = height;
  
  background(0,0,0);
  image(imgGameOver, 95, 20);
  fill(0, 255, 0);
  rect(largura / 2 - 135, altura / 2 + 40, 300, 40);
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(18);
  text("Aperte V para jogar novamente", largura / 2 + 15, altura / 2 + 60);
}

function nextLevel () {
   background(255,255,255);
   image(imgNextLevel, 70, 20);    
   fill(0, 255, 0);
   rect(width / 2 - 160, height / 2 + 40, 340, 40);
   fill(255);
   textSize(18);
   text("Aperte Q para ir para a próxima fase", width/2 - 140, height/2+65);
}

function vitoriaFinal () {
   pontuador();
   background(255,255,255);
   fill(0);
   textSize(22);
   text("Obrigado por ajudar o herói a salvar o dia!",50,100);
   text("Sua pontuação foi: " + pontuacao, 60,220);
}
 
function relogio () {
  if (frameCount % 60 == 0 && tempo > 0 && isClockRunning === true) { 
    tempo++;
  }
}

function pontuador () {
  for (i = 0; i < arrTempo.length; i++) {
    if (arrTempo[i] < 10) {
      pontuacao += 100;
    } else if (arrTempo[i] > 10 && arrTempo[i] < 25) {
      pontuacao += 50;
    } else {
      pontuacao += 20;
    }
  }
}

function detectarColisao () {
  collideEquation1 = collideRectRect(escolha1.posicaoX,escolha1.posicaoY,escolha1.altura,escolha1.largura,eqX,eqY,220,30);
  
  collideEquation2 = collideRectRect(escolha2.posicaoX,escolha2.posicaoY,escolha2.altura,escolha2.largura,eqX,eqY,220,30);
  
  collideEquation3 = collideRectRect(escolha3.posicaoX,escolha3.posicaoY,escolha3.altura,escolha3.largura,eqX,eqY,220,30);
  
  collideEquation4 = collideRectRect(escolha4.posicaoX,escolha4.posicaoY,escolha4.altura,escolha4.largura,eqX,eqY,220,30);
  
  collide1 =     collideRectRect(principal.x,principal.y,principal.largura,principal.largura,escolha1.posicaoX, escolha1.posicaoY,escolha1.altura,escolha1.largura);
  
  collide2 =     collideRectRect(principal.x,principal.y,principal.largura,principal.largura,escolha2.posicaoX, escolha2.posicaoY,escolha2.altura,escolha2.largura);
  
  collide3 =   collideRectRect(principal.x,principal.y,principal.largura,principal.largura,escolha3.posicaoX, escolha3.posicaoY,escolha3.altura,escolha3.largura);
  
  collide4 =   collideRectRect(principal.x,principal.y,principal.largura,principal.largura,escolha4.posicaoX, escolha4.posicaoY,escolha4.altura,escolha4.largura);
  
  if (collide1 || collide2 || collide3 || collide4) {
      if (principal.y > 250) {
       textSize(32);
      text('Aperte X para agarrar', 100, 180);
    }
    
    if (collide1) {
      keyPressed('1'); 
    } else if (collide2) {
      keyPressed('2');
    } else if (collide3) {
      keyPressed('3');
    } else if (collide4) {
      keyPressed('4');
    } else {
    }
  }
  
  if (collideEquation1) {
    conferirResultado('1');
  } else if (collideEquation2) {
    conferirResultado('2');
  } else if (collideEquation3) {
    conferirResultado('3');
  } else if (collideEquation4) {
    conferirResultado('4');
  }
}

let cont = 0;
function keyPressed(escolhido) {
  if (keyIsDown(88) && escolhido === '1') {
    /*Fazendo a escolha seguir o personagem principal*/
    escolha1.posicaoY = principal.y;
    escolha1.posicaoX = principal.x;
    
    if (keyCode === 88 && cont < 1) {
      pegar.play();
    }
    cont++;
  } else if (keyIsDown(88) && escolhido === '2') {
    /*Fazendo a escolha seguir o personagem principal*/
    escolha2.posicaoY = principal.y;
    escolha2.posicaoX = principal.x;
    
    if (keyCode === 88 && cont < 1) {
      pegar.play();
    }
    cont++;
  } else if (keyIsDown(88) && escolhido === '3') {
    /*Fazendo a escolha seguir o personagem principal*/
    escolha3.posicaoY = principal.y;
    escolha3.posicaoX = principal.x;
    
    if (keyCode === 88 && cont < 1) {
      pegar.play();
    }
    cont++;
  } else if (keyIsDown(88) && escolhido === '4') {
    /*Fazendo a escolha seguir o personagem principal*/
    escolha4.posicaoY = principal.y;
    escolha4.posicaoX = principal.x;
    
    if (keyCode === 88 && cont < 1) {
      pegar.play();
    }
    cont++;
  } else {
    cont = 0;
  }
  if (keyCode === UP_ARROW) {
    if (posiCursor > 1){
       posiCursor = posiCursor - 1;   
    }
  } else if (keyCode === DOWN_ARROW) {
    if (posiCursor < 3) {
       posiCursor = posiCursor + 1; 
    }
  } else {}
  
  if(keyCode==ENTER){
    if (posiCursor == 1) {
      estado = 2;
    } else if (posiCursor == 2) {
      estado = 3; 
    } else if (posiCursor === 3) {
      estado = 4;
    }
  }
  
  //V
  if (keyCode === 86) {
    reset();
  }
  
  //Q
  if (keyCode === 81) {
    if (nivel === dificuldades[0]) {
     fase2(); 
    } else {
      fase3();
    }
  }
  
  if (posiCursor === 1) {
    ycursor = ybotao1;
  } else if (posiCursor === 2) {
    ycursor = ybotao2;
  } else if (posiCursor === 3) {
    ycursor = ybotao3;
  }
}

function mover() {
    if (keyIsDown(UP_ARROW)) {
      principal.y-=2;
      frameRate(45);
      hero = newHeroImages[round(random([2,3,10]))];
    } else if (keyIsDown(DOWN_ARROW)) {
      principal.y+=2;
      frameRate(45);
      hero = newHeroImages[round(random([0,1,8]))];
    } else if (keyIsDown(LEFT_ARROW)) {
      principal.x-=2;
      frameRate(45);
      hero = newHeroImages[round(random([4,5,6,7,9]))];
    } else if (keyIsDown(RIGHT_ARROW)) {
      principal.x+=2;
      frameRate(45);
      hero = newHeroImages[round(random(11,15))];
    } else {
    } 
}

function jogar(){
  background(fundo,32,178,170);
  isClockRunning = true;
  relogio();

  stroke(0,0,0);
  fill(0,0,0);
  strokeWeight(1);
  fill(255,215,0);
  textFont('georgia');
  textSize(50);
  
  text(tempo, 10, 45);
  text(arrValores[0], eqX, eqY);
  
  //Persona Principal
  image(hero,principal.x,principal.y);
  
  //escolhas
  image(escolhaImg1, escolha1.posicaoX, escolha1.posicaoY, escolha1.altura, escolha1.largura);
  textSize(24);
  text(escolha1.resposta,escolha1.posicaoX+10, escolha1.posicaoY+22);
  
  image(escolhaImg2,escolha2.posicaoX, escolha2.posicaoY, escolha2.altura, escolha2.largura);
  textSize(24);  
  text(escolha2.resposta,escolha2.posicaoX, escolha2.posicaoY+22);
  
  image(escolhaImg3,escolha3.posicaoX, escolha3.posicaoY, escolha3.altura, escolha3.largura);
  textSize(24);
  text(escolha3.resposta,escolha3.posicaoX, escolha3.posicaoY+22);
  
  image(escolhaImg4,escolha4.posicaoX, escolha4.posicaoY, escolha4.altura, escolha4.largura);
  textSize(24);
  text(escolha4.resposta,escolha4.posicaoX, escolha4.posicaoY+22);
  
  //Funções
  detectarColisao();
  mover();
}

function conferirResultado (escolha) {   
  /*Relogio para de rodar e é capturado os segundos que
  o jogador passou jogando*/
  isClockRunning = false;
  pegar.stop();
  vencer.play();
  
  if (nivel === dificuldades[2]) {
    if (escolha === '1') {
      if (arrValores[1] === escolha1.resposta) {
        noLoop();
        arrTempo.push(tempo);
        console.log(arrTempo);
        vitoriaFinal();
      } else {
        vencer.stop();
        gameOver();
      }
    } else if (escolha === '2') {
      if (arrValores[1] === escolha2.resposta) {
        noLoop();
        arrTempo.push(tempo);
        console.log(arrTempo);
        vitoriaFinal();
      } else {
        vencer.stop();
        gameOver();
      }
    } else if (escolha === '3') {
      if (arrValores[1] === escolha3.resposta) {
        noLoop();
        arrTempo.push(tempo);
        console.log(arrTempo);
        vitoriaFinal();
      } else {
        vencer.stop();
        gameOver();
      }
    } else if (escolha === '4') {
      if (arrValores[1] === escolha4.resposta) {
        noLoop();
        arrTempo.push(tempo);
        console.log(arrTempo);
        vitoriaFinal();
      } else {
        vencer.stop();
        gameOver();
      }
    }
  } else {
    if (escolha === '1') {
    if (arrValores[1] === escolha1.resposta) {
      noLoop();
      arrTempo.push(tempo);
      console.log(arrTempo);
      nextLevel();
    } else {
      vencer.stop();
      gameOver();
    }
    } else if (escolha === '2') {
      if (arrValores[1] === escolha2.resposta) {
        noLoop();
        arrTempo.push(tempo);
        console.log(arrTempo);
        nextLevel();
      } else {
        vencer.stop();
        gameOver();
      }
    } else if (escolha === '3') {
      if (arrValores[1] === escolha3.resposta) {
        noLoop();
        arrTempo.push(tempo);
        console.log(arrTempo);
        nextLevel();
      } else {
        vencer.stop();
        gameOver();
      }
    } else if (escolha === '4') {
      if (arrValores[1] === escolha4.resposta) {
        noLoop();
        arrTempo.push(tempo);
        console.log(arrTempo);
        nextLevel();
      } else {
        vencer.stop();
        gameOver();
      }
    } 
  }
}

function fase2 () { 
  nivel = dificuldades[1];
  tempo = 1;
  arrValores = gerarNumeros();
  
  let respCorreta = round(random(0,3));
  arrWrongAnswers[respCorreta] = arrValores[1];
  
    for (let i = 0; i < 4; i++) {
      
      if (i !== respCorreta) {
        arrWrongAnswers[i] = round(random(0,50));
      }
    }
  
  //Posição do Personagem Principal
   principal = new Principal(200,200,50,50);

  //Posição das Esolhas
   escolha1 = new Escolha('escolha1',350,100,40,40,arrWrongAnswers[0]);

   escolha2 = new Escolha('escolha2',350,200,40,40,arrWrongAnswers[1]);

   escolha3 = new Escolha('escolha3',350,300,40,40,arrWrongAnswers[2]);

   escolha4 = new Escolha('escolha4',350,400,40,40,arrWrongAnswers[3]);
  
  loop()
  jogar();
}

function fase3 () {  
  nivel = dificuldades[2];
  tempo = 1;
  arrValores = gerarNumeros();
  
  let respCorreta = round(random(0,3));
  arrWrongAnswers[respCorreta] = arrValores[1];
  
    for (let i = 0; i < 4; i++) {
      
      if (i !== respCorreta) {
        arrWrongAnswers[i] = round(random(0,50));
      }
    }
  
  //Posição do Personagem Principal
   principal = new Principal(200,200,50,50);

  //Posição das Esolhas
   escolha1 = new Escolha('escolha1',350,100,40,40,arrWrongAnswers[0]);

   escolha2 = new Escolha('escolha2',350,200,40,40,arrWrongAnswers[1]);

   escolha3 = new Escolha('escolha3',350,300,40,40,arrWrongAnswers[2]);

   escolha4 = new Escolha('escolha4',350,400,40,40,arrWrongAnswers[3]);
  
  loop()
  jogar();
}

function instrucoes(){
  background(fundo, 70);
  stroke(255,215,0);
  fill(0,0,0);
  strokeWeight(0);
  fill(255,215,0);
  text('Instruções:',180,70);
  textSize(25);
  text("O jogo consiste em gerar equações aleato-\nriamente, que aparecerão na parte superior\n da tela, já na inferior haverá 4 opções de \nrespostas, onde penas uma opção será \ncorreta. O personagem deve escolher uma\n das opções e leva-las até a equação.",20,120);  
  text("Setas do teclado para andar",20,320);
  text("X para agarrar a resposta",20,360);
  text("Aperte V para voltar ao menu",30,430);
}

function creditos(){
  background (220);
  textSize(36);
  fill(10);
  text("Créditos", 160,70);
  textSize(20);
  text ("MANUELLY BARBOSA",200, 120 );
  text ("LUAN SILVA" ,240,300);
  textSize (16);
  text("Função:programadora", 230,140);
  text ("Função:programador", 230,320);
  textSize(14);
  fill(80);
  text("responsável pelo menu do jogo, GDD, sons e colabeduc",180,165,300);
  text("responsável pela fase 1 do jogo, video explicativo e imagens 2D",180,345,300);
  image(img1, 20, 110,150,150);
  image(img2, 20, 280,150,150);

  text("Aperte V para voltar ao menu",160,480);
}