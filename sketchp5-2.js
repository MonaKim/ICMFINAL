var systems;

function setup() {
  createCanvas(windowWidth, windowHeight);
  systems = [];
}

function draw() {
  clear(0);
  for (i = 0; i < systems.length; i++) {
    systems[i].run();
    systems[i].addParticle();
  }
  if (systems.length==0) {
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("tap to add mold", width/2, height/2);
  }

  if(systems.length >= 6)
  {
    // systems[0];
    systems.splice(0,1);
  }
}

function mousePressed() {
  this.p = new ParticleSystem(createVector(mouseX, mouseY));
  systems.push(p);
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.drag = 0.5;
  this.lifespan -= 2;
};

Particle.prototype.display = function () {
  stroke(120, this.lifespan);
  strokeWeight(0.5);
  fill(random(127),random(255),random(120), this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
  this.lifespan--;

};

Particle.prototype.isDead = function () {
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  // Add either a Particle or CrazyParticle to the system
  if (int(random(0, 2)) == 0) {
    p = new Particle(this.origin);
  }
  else {
    p = new CrazyParticle(this.origin);
  }
  this.particles.push(p);
};

ParticleSystem.prototype.run = function () {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
function CrazyParticle(origin) {
  Particle.call(this, origin);
  this.theta = 0.0;
  this.clear;
};

CrazyParticle.prototype = Object.create(Particle.prototype); // See note below

CrazyParticle.prototype.constructor = CrazyParticle;

CrazyParticle.prototype.update=function() {
  Particle.prototype.update.call(this);
  this.theta += (this.velocity.x * this.velocity.mag()) / 20.0;
  this.lifespan--;

}
CrazyParticle.prototype.display=function() {
  Particle.prototype.display.call(this);
  push();
  translate(this.position.x, this.position.y);
  rotate(this.theta*2);
  stroke(random(55),random(100), random(120),this.lifespan);
  line(20,0,50,0);
  line(10, 10, 10, 20);
  line(20, 0, 20, 20);
  line(30, 0, 30, 20);
  line(40, 0, 40, 20);
  line(50, 0, 50, 20);
  pop();
}
