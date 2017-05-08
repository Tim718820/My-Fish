var can1;
var can2;
var ctx1;
var ctx2;

var canWidth; //canvas寬高
var canHeigth;

var mouseX;
var mouseY;

var lastTime;
var deltaTime;

var bgImg = new Image();

var fish = [];


document.body.onload = startgame;
function startgame() //開始遊戲
{
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}
function init() //初始化
{
    can1 = document.getElementById("canvas1");
    can2 = document.getElementById("canvas2");
    ctx1 = can1.getContext('2d');
    ctx2 = can2.getContext('2d');

    bgImg.src = "Image/sea.jpg";
    
    MainFish = new MainFish();
    MainFish.init();
    
    Jellyfish = new Jellyfish();
    Jellyfish.init();
    
    canWidth = can1.width;
    canHeigth = can1.height;
    
    mouseX = canWidth / 2;
    mouseY = canHeigth / 2;
    
    can1.addEventListener("mousemove",onMousemove,false);
    
    for(var x=1; x<=3 ;x++){
        fish[x] = new Image();
        fish[x].src = "Image/fish"+x+".png";
    }
}

//循環gameloop 
function gameloop() 
{
   window.requestAnimationFrame(gameloop); //使用requestAnimationFrame重複執行gameloop
   
   var now = Date.now(); //每次執行的時間多久
   deltaTime = now -lastTime;
   lastTime = now;
   
   drawBackground();
   Jellyfish.drawJellyFish();
   ctx1.clearRect(0,0,canWidth,canHeigth);
   
   MainFish.drawfish();
  
}


//背景
function drawBackground(){
    ctx2.drawImage(bgImg,0,0,canWidth,canHeigth);
}



//主要的魟魚
var MainFish = function()
{
    this.x;
    this.y;
    this.Timer = 0;
    this.Count = 0;
    this.fishA = new Image();
}
MainFish.prototype.init = function()
{
    this.x = canWidth / 2;
    this.y = canHeigth / 2;
    this.fishA.src = "Image/fish1.png";
}
MainFish.prototype.drawfish = function()
{
   this.x = followMouse(mouseX, this.x, 0.9);
   this.y = followMouse(mouseY, this.y, 0.9);
   
  this.Timer += deltaTime;
  if(this.Timer > 100){
      this.Count = (this.Count + 1) % 3;
      this.Timer %= 100;
  }
   ctx1.save();
   var Count = this.Count;
   
   ctx1.drawImage(fish[Count], mouseX-110, mouseY-70,150,150);
   
   ctx1.restore();
}

//尋找滑鼠座標
function onMousemove(event)
{
    if(event.offSetX || event.layerX)
    {
        
        mouseX = event.offSetX == undefined ? event.layerX : event.offSetX;
        mouseY = event.offSetY == undefined ? event.layerY : event.offSetY;
        console.log(mouseX);
        
    }
    
}

//讓魟魚跟著滑鼠的自訂方法
function followMouse(x,y,v)
{
        var follow = y - x;
        return x + follow * v;
        
}

//水母
var Jellyfish = function()
{
    //this.alive = [];
    this.xx = [];
    this.yy = [];
    this.speed = [];
    this.jlyfish = new Image();
}

Jellyfish.prototype.init = function()
{
    for(var i=1; i <= 30 ; i++){
        //this.alive[i] = true;
        this.xx[i] = 0;
        this.yy[i] = 0;
        this.speed[i] = Math.random() * 0.005;
        
        
    }
    this.jlyfish.src = "Image/Jellyfish-1.png";
}
Jellyfish.prototype.drawJellyFish = function()
{
    for(var i=1; i <= 30 ; i++){
        
        this.yy[i] -= this.speed[i] * 10 * deltaTime;    
        ctx2.drawImage(this.jlyfish,this.xx[i],this.yy[i],25,35);
        if(this.yy[i] < 5){
            this.create(i);
        }
    }
}
//創建水母的位置
Jellyfish.prototype.create = function(i)
{
    this.xx[i] = Math.floor(Math.random()*790)+1;
    this.yy[i] = 550;
}



