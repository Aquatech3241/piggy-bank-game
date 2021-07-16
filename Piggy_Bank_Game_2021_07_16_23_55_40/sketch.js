var bg, pig, coin, brokenPig, lightning;
var bgImg, coinImg, lightningImg, brokenPigImg, pigImg;
var lightningGroup;
var gameState = "play";
var gameoverImg, restartImg;
var gameover, restart;
var score = 0;
var gameoverSound1, lightningSound1, coinAdd1;
var gameoverSound, lightningSound, coinAdd;

function preload() {
  bgImg = loadImage("background.jpeg");
  coinImg = loadImage("gold coin.png");
  pigImg = loadAnimation("piggy bank.png");
  lightningImg = loadImage("lightning.png");
  gameoverImg = loadImage("maxresdefault-removebg-preview.png");
  restartImg = loadImage("restart.png");
  brokenPigImg = loadImage("broken.png");

  gameoverSound1 = loadSound("gameoverSound.wav");
  lightningSound1 = loadSound("lightningSound.mp3");
  coinAdd1 = loadSound("coinAdd.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(width / 2, height / 2);
  bg.scale = 3;
  bg.addImage(bgImg);

  pig = createSprite(width / 2, height / 2 + 200);
  pig.addAnimation("pig1", pigImg);
  pig.addAnimation("pig2", brokenPigImg);

  restart = createSprite(width / 2, height / 2 + 50);
  restart.addImage(restartImg);
  restart.scale = 0.5;

  gameover = createSprite(width / 2, height / 2 - 70);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.8;

  lightningGroup = new Group();
  coinGroup = new Group();

  pig.debug = false;
  pig.setCollider("circle", 0, 47, 80);
}

function draw() {
  background(220);

  if (gameState === "play") {
    pig.changeAnimation("pig1", pigImg);
    gameover.visible = false;
    restart.visible = false;
    spawnLightning();
    if (frameCount % 110 === 0) {
      lightningGroup.destroyEach();
    }

    pig.x = mouseX;

    spawnCoins();
    if (coinGroup.isTouching(pig)) {
      coinAdd1.play();
      score = score + 10;
      coinGroup[0].destroy();
    }
    if (lightningGroup.isTouching(pig)) {
      gameState = "end";
      gameoverSound1.play();
    }
  }
  if (gameState === "end") {
    gameover.visible = true;
    pig.changeAnimation("pig2", brokenPigImg);
    pig.scale = 0.5;
    pig.x = 350;
    pig.y = 500;
    restart.visible = true;

    if (mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
  fill("white");
  textSize(50);
  text("score: " + score, 100, 50);
}

function spawnLightning() {
  if (frameCount % 100 === 0) {
    lightning = createSprite(
      Math.round(random(20, height - 20)),
      Math.round(random(width / 4, height / 2 + 100))
    );
    lightningSound1.play();
    lightning.addImage(lightningImg);
    lightningGroup.add(lightning);
    lightning.debug = false;

    lightning.setCollider("rectangle", 0, 0, 150, 330);
  }
  if (score % 30 === 0 && score > 0) {
    if (frameCount % 50 === 0) {
      lightning = createSprite(
        Math.round(random(20, height - 20)),
        Math.round(random(width / 4, height / 2 + 100))
      );
      lightningSound1.play();
      lightning.addImage(lightningImg);
      lightningGroup.add(lightning);
      lightning.debug = false;

      lightning.setCollider("rectangle", 0, 0, 150, 330);
    }
  }
}
function spawnCoins() {
  if (frameCount % 100 === 0) {
    coin = createSprite(Math.round(random(20, height - 20)), 100);
    coin.addImage(coinImg);
    coin.scale = 0.15;
    coin.velocityY = 20;
    coinGroup.add(coin);
  }
}
function reset() {
  gameState = "play";
  score = 0;
  gameover.visible = false;
  restart.visible = false;
  pig.scale = 1.1;
  lightningGroup.destroyEach();
  coinGroup.destroyEach();
}
