`use strict`

//date
var dt = new Date();
document.getElementById('date-time').innerHTML=dt;
function refreshTime() {
  const timeDisplay = document.getElementById('date-time');
  const dateString = new Date().toLocaleString();
  const formattedString =  dateString.replace(","," -");
  timeDisplay.textContent = formattedString;
}
setInterval(refreshTime, 1000);

//alert
window.alert("You must be 18 months or older to enter.");
window.alert("Try type 'help' for instructions, 'about' for more information, and 'why' for the inspiration.")

//get API
let nudesArray = [];

async function getImageData() {
  let url = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=female%20nude&medium=Paintings";

  try {
    const response = await fetch(url);
    const resp = await response.json();
    
    let objectIDs = resp.objectIDs;
    let fetchPromises = []; 

    for (const objectID of objectIDs) {
      let objectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;

        fetch(objectUrl)
        .then(function(feedback){
          return feedback.json();
        })
        .then(function(feed){
          if ( feed.tags ) {
            if (feed.tags[0].term.includes('Female Nudes') && feed.primaryImage){
              nudesArray.push(feed.primaryImage);
            }
          }
        });
    } 
  } catch (error) {
    console.log("There was an error");
  }
}

getImageData();

//random image placement
const randomImages = document.querySelectorAll('#randomImage1, #randomImage2, #randomImage3, #randomImage4, #randomImage5, #randomImage6, #randomImage7, #randomImage8');

randomImages.forEach(function(randomImage) {
  const imageWidth = randomImage.offsetWidth;
  const imageHeight = randomImage.offsetHeight;
  const maxX = Math.max(0, window.innerWidth - imageWidth - 100);
  const maxY = Math.max(0, window.innerHeight - imageHeight - 100);
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  randomImage.style.marginTop = randomY + 'px';
  randomImage.style.marginLeft = randomX + 'px';
});

//instead of pressing keys down simultaneously, another way to check if keys are pressed serially
const keySequences = [
  { sequence: "free", elementId: "randomImage1" },
  { sequence: "sexy", elementId: "randomImage2" },
  { sequence: "nude", elementId: "randomImage3" },
  { sequence: "nipple", elementId: "randomImage4" },
  { sequence: "bitch", elementId: "randomImage5" },
  { sequence: "slut", elementId: "randomImage6" },
  { sequence: "shame", elementId: "randomImage7" },
  { sequence: "help", elementId: "help" },
  { sequence: "about", elementId: "about"},
  { sequence: "why", elementId: "why"}
];

let typeKeysString = "";

window.addEventListener('keydown', function (event) {
  const currentKey = event.key;
  const randomIndex = Math.floor(Math.random() * nudesArray.length);
  const image = new Image();

  typeKeysString += currentKey;
  console.log(typeKeysString);

  for (const keySequence of keySequences) {
    if (typeKeysString.includes(keySequence.sequence)) {
      typeKeysString = "";
      if (keySequence.elementId === "help") {
        document.getElementById("help").innerHTML = 'Type away! <br>Remember, you are what you type. You get what you type.';
      } else if (keySequence.elementId === "about") {
        document.getElementById("about").innerHTML = 'This site is made out of rage over nipple censorships on social media. Be yourself and embrace your NIPPLES. Image courtsey of The Metropolitan Museum.<br><a href="https://www.luoyanxiu.com/index.html" style ="text-decoration: none; color: #97190f" target="_blank">Concept & Design by @luoyanxiu 2023</a>';
      } else if (keySequence.elementId === "why") {
        document.getElementById("why").innerHTML = 'Still wondering? Read <a href="https://www.jofreeman.com/joreen/bitch.htm" style= "text-decoration: none; color: #97190f" target="_blank"> The BITCH Manifesto </a>now!';
      } else {
        image.src = nudesArray[randomIndex];
        document.getElementById(keySequence.elementId).innerHTML = '';
        document.getElementById(keySequence.elementId).appendChild(image);
      }
    }
  }
});

// //hold keys at the same time BONUS
// const pressedKeys = new Set();
// window.addEventListener('keydown', function (event) {
//   pressedKeys.add(event.key);
//   //console.log(pressedKeys);
//   const randomIndex = Math.floor(Math.random() * nudesArray.length);
//   const image = new Image();

//   //keyboardissexy
//   if (pressedKeys.has('k') && pressedKeys.has('e') && pressedKeys.has('y') && pressedKeys.has('b') && pressedKeys.has('o') && pressedKeys.has('a') && pressedKeys.has('r') && pressedKeys.has('d') && pressedKeys.has('i') && pressedKeys.has('s') && pressedKeys.has('x') && pressedKeys.has('y')) {
//     image.src = nudesArray[randomIndex];
//     document.getElementById("randomImage8").innerHTML = '';
//     document.getElementById("randomImage8").appendChild(image);
//   }
// });

// window.addEventListener('keyup', function (event) {
//   pressedKeys.delete(event.key);
// });