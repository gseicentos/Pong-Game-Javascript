//variáveis bolinha
let xBolinha = 300
let yBolinha = 200
let dBolinha = 15

let vxBolinha = 6
let vyBolinha = 6

let raioBolinha = dBolinha/2

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 175;
let comprimentoRaquete = 8;
let alturaRaquete = 50;
let colidiu = false;

//variaveis oponente
let xOponente = 585;
let yOponente = 175;
let velocidadeyOponente;
let erroOponente = 0;

//placar do jogo
let meusPontos = 0;
let oponentePontos = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;


function setup() {
  createCanvas(600, 400);
  trilha.loop ();
}

function draw() {
  background(0);
  mostraBolinha ();
  movimentaBolinha ();
  verificaColisaoBorda ();
  mostraRaquete (xRaquete, yRaquete);
  movimentaMinhaRaquete ();
  verificaColisaoRaquete ();
  //colisaoRaqueteHub (xRaquete, yRaquete);
  mostraRaquete (xOponente, yOponente);
  movimentaOponente ();
  //colisaoRaqueteHub (xOponente, yOponente);
  incluiPlacar ();
  marcaPonto ();
  bolinhaNaoFicaPresa();
}
function mostraBolinha (){
  circle(xBolinha, yBolinha, dBolinha)
}
function movimentaBolinha (){
  xBolinha += vxBolinha
  yBolinha += vyBolinha
}

function verificaColisaoBorda (){
  if (xBolinha + raioBolinha > width ||
      xBolinha - raioBolinha <0){
    vxBolinha *= -1;
  }
  
  if (yBolinha + raioBolinha > height ||
      yBolinha - raioBolinha <0){
    vyBolinha *= -1;
  }
}

function mostraRaquete (x, y){
  rect (x, y, comprimentoRaquete, alturaRaquete)
}
  
function movimentaMinhaRaquete (){
  if (keyIsDown (UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown (DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete (){
  if (xBolinha - raioBolinha < xRaquete + comprimentoRaquete && yBolinha - raioBolinha < yRaquete + alturaRaquete && yBolinha + raioBolinha > yRaquete){
    vxBolinha *= -1
  }
  if (xBolinha + raioBolinha > xOponente && yBolinha - raioBolinha < yOponente + alturaRaquete && yBolinha + raioBolinha > yOponente){
    vxBolinha *= -1
  }
}

function colisaoRaqueteHub (x, y){
  colidiu =  collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha);
  if (colidiu){
    vxBolinha *= -1
    raquetada.play ();
  }
}

function movimentaOponente (){
  velocidadeyOponente = yBolinha - yOponente - comprimentoRaquete / 2 - 30
  yOponente += velocidadeyOponente + erroOponente
  calculaErroOponente()
}

function calculaErroOponente (){
     if (oponentePontos >= meusPontos){
      erroOponente += 1
      if (erroOponente +=39){
      erroOponente = 40
      }
     } else {
       erroOponente -= 1
       if (erroOponente <= 25){
       erroOponente = 25
       }
     }
}

function incluiPlacar (){
  stroke (255);
  textAlign (CENTER);
  textSize(16);
  fill (color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill (color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(oponentePontos, 470, 26);
}

function marcaPonto (){
  if (xBolinha > 590){
    meusPontos += 1
    ponto.play ();
  }
  if (xBolinha < 10) {
    oponentePontos += 1
    ponto.play ();
  }
}

function preload (){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raioBolinha < 0){
      xBolinha = 20
    }
  if (xBolinha + raioBolinha > 600){
    xBolinha = 580
  }  
}