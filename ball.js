// Global variables
  const size = 20;
  const balls = [];
  const px = [];
  const py = [];
  const vx = [];
  const vy = [];
  const colors = ["red","blue", "yellow", "purple", "darkorange", "cadetblue",  "green", "darkviolet", "pink", "deepskyblue"];
  const gravity = 0.75;
  let height = window.innerHeight;
  let width = window.innerWidth;
  let Xmin = 0;
  let Xmax = width - size*2;
  let Ymin = 0;
  let Ymax = height - size*2;
  let totalFactoryOutput = 0;
  let xmouse, ymouse;

 
  window.onresize = function(){
    height = window.innerHeight;
    width = window.innerWidth;
    Xmax = width - size*2;
    Ymax = height - size*2;
  }

  //added prompt to avoid having to use console to create balls and initiate movement
  let numberBalls = prompt("Enter Number of Balls or Press Cancel and Double Click in the window to add Balls");
  if (numberBalls!= null) {
    factory(numberBalls);
    update();
  }



//defines 1 of 10 random colors
function randomColor(){
  return colors[Math.floor(Math.random() * 10)];
}

function getRandomScale(scale) {
  return Math.floor(Math.random() * scale - scale / 2);
}

// check ball position and reverse direction if balls reach defined boundries.
function checkBorders(i){

  // changed from 0 to Xmin
  if(px[i] <= Xmin)
    {
      vx[i] =  - vx[i];
      px[i]=0;
  // changed from 800 to Xmax
    } else if(px[i] >= Xmax)
  {
      vx[i] =  - vx[i];
      px[i]=Xmax - size;
  }
  // changed from 0 to Ymin
  if(py[i] <= Ymin)
  {
      vy[i] = - vy[i];
      py[i]=0;
  // changed from 400 to Ymax
  } else if(py[i] >= Ymax)
  {
      vy[i] = - vy[i];
      py[i]=Ymax - size;
  }  
}

function update() {
  
  for (let i = 0; i < balls.length; i++) {
  
  // moves balls across window and adds gravities affect to Y velocity
    px[i] = px[i] + vx[i];
    vy[i] = vy[i] + gravity;
    py[i] = py[i] + vy[i];
  
  //reverses direction if balls reach border
    checkBorders(i);
    
    //added px to end of new X and Y position
    balls[i].style.left = px[i] + 'px';
    balls[i].style.top = py[i] + 'px';

  }
  
}

// this function makes a ball with position color, and velocity set
function create(dx, dy, color, velx, vely, fixed) {
  ball = document.createElement("div");
  ball.style.backgroundColor = color;
  ball.className = "ball";
  ball.style.height = size + "px";
  ball.style.width = size + "px";
  ball.style.top = dy + "px";
  ball.style.left = dx + "px";
  document.body.appendChild(ball);
  if (!fixed) {
    // only free balls will be updated
    balls.push(ball);
    px.push(dx);
    py.push(dy);
    vx.push(velx);
    vy.push(vely);
  }
}
// function to create balls with independennt random features
function factory(total) {
  //added so starting position had function scope so balls act independently
  let startX = 0;
  let startY = 0;

  for (let i = 0; i < total; i++) 
  {
    //gives velocity function scope so balls act independently
    // made value 11 to avoid zero veelocity
    let velx  = 10;
    let vely  = 10;
    
    vely = getRandomScale(vely);
    velx = getRandomScale(velx);

    //added to have balls start at the center of the window
    //TODO CREATE SEPARATE FUNCTION
    startY = Math.floor(Math.random() * height);
    startX = (width- size)/2;

    // added fucntion to create random color for each pair of balls
    let color = randomColor();
    //call to the create function with require arguments
    create(startX, startY, color, velx, vely, 0);
    create(startX, startY, color, -velx, -vely, 0);
  }
  totalFactoryOutput += total;

}

//added two opposing ball, random color and the update function
var mouse = function (e) {
  ymouse = e.clientY;
  xmouse = e.clientX;
  let velx  = 10;
  let vely  = 10;
  //adds some randomness to vertical ball movement
  const Yvel = Math.floor(Math.random()*vely-vely/2);
  const Xvel = Math.floor(Math.random()*velx-velx/2);
  //adds common random color to both balls
  let color = randomColor();
  //added second create to add two symetrical balls
  create(xmouse, ymouse, color, Xvel, Yvel, 0);
  create(xmouse, ymouse, color, -Xvel, -Yvel, 0);
  // two more added to array
  totalFactoryOutput += 2; 
  update();
};

//added double click to event listener
if (window.addEventListener) {
  document.addEventListener("dblclick", mouse, false);
}

setInterval(update, 20); 

