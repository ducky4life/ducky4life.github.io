"use strict";

// code is modified from https://greywardens.xyz/tools/region_bbcode/ , thank you :D
let season = 4
let sectors = [];
for (let k = 0; k < season; k++) {
    sectors = sectors.concat({ color: "#FFBC03", text: "rgb(255, 217, 0)", label: "MEOW" });
}
let rand = (m, M) => Math.random() * (M - m) + m;
let tot = sectors.length;
let spinEl = document.querySelector("#spin");
let ctx = document.querySelector("#wheel").getContext("2d");
let dia = ctx.canvas.width;
let rad = dia / 2;
let PI = Math.PI;
let TAU = 2 * PI;
let arc = TAU / sectors.length;
let friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians
const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]



function getCharacter(index) {
    return hexCharacters[index]
}

function generateNewColor() {
    let hexColorRep = "#"

    for (let index = 0; index < 6; index++){
        const randomPosition = Math.floor ( Math.random() * hexCharacters.length ) 
        hexColorRep += getCharacter( randomPosition )
    }

    return hexColorRep
}

console.log( generateNewColor() )
function setstuff() {
  season = document.querySelector('#season').value;
  sectors = [];
for (let k = 0; k < season; k++) {
    sectors = sectors.concat({ color: "#1a1f46", text: "#b0ffff", label: "nothing here :(" });
}
rand = (m, M) => Math.random() * (M - m) + m;
tot = sectors.length;
spinEl = document.querySelector("#spin");
ctx = document.querySelector("#wheel").getContext("2d");
dia = ctx.canvas.width;
rad = dia / 2;
PI = Math.PI;
TAU = 2 * PI;
arc = TAU / sectors.length;
friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
angVel = 0; // Angular velocity
ang = 0; // Angle in radians
}

let spinButtonClicked = false;

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

function output(e)
{
    const dbidInput = document.querySelector('#dbid').value.split('\n');

    for (let i = 0; i !== dbidInput.length; i++) {
        sectors.splice(i, 1, { color: generateNewColor(), text: "#b0ffff", label: dbidInput[i] });
    }
    for (let j = 0; j < sectors.length; j++)
    {
        drawSector(sectors[j], j);
    }
}

document.querySelector('#convert').addEventListener('click', init);
  
  const events = {
    listeners: {},
    addListener: function (eventName, fn) {
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].push(fn);
    },
    fire: function (eventName, ...args) {
      if (this.listeners[eventName]) {
        for (let fn of this.listeners[eventName]) {
          fn(...args);
        }
      }
    },
  };
  
  
  function drawSector(sector, i) {
    const ang = arc * i;
    ctx.save();
  
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
  
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = sector.text;
    ctx.font = "bold 30px 'Lato', sans-serif";
    ctx.fillText(sector.label, rad - 10, 10);
    //
  
    ctx.restore();
  }
  
  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  
    spinEl.textContent = !angVel ? "weeee?" : sector.label;
    spinEl.style.background = sector.color;
    spinEl.style.color = sector.text;
  }
  
  function frame() {
    // Fire an event after the wheel has stopped spinning
    if (!angVel && spinButtonClicked) {
      const finalSector = sectors[getIndex()];
      events.fire("spinEnd", finalSector);
      spinButtonClicked = false; // reset the flag
      return;
    }
  
    angVel *= friction; // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0; // Bring to stop
    ang += angVel; // Update angle
    ang %= TAU; // Normalize angle
    rotate();
  }
  
  function engine() {
    frame();
    requestAnimationFrame(engine);
  }
  
  function init() {
    setstuff();
    sectors.forEach(drawSector);
    console.log(season);
    rotate(); // Initial rotation
    engine(); // Start engine
    spinEl.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.25, 0.45);
      spinButtonClicked = true;
    });
    output();
  }
  
  events.addListener("spinEnd", (sector) => {
    const myPopup = new Popup({
      id: "my-popup",
      title: "skirt go spinned.",
      content: `u spun ${sector.label}`,
      backgroundColor: "#1a1f46",
      titleColor: "#b0ffff",
      textColor: "#b0ffff",
      closeColor: "#b0ffff",
  });
  myPopup.show();
  });