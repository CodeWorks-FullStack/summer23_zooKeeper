// SECTION global variables

const animals = [
  {
    name: 'Jeremy',
    emoji: '🦞',
    mood: '😁',
    hunger: 100,
    isAlive: true
  },
  {
    name: 'Michaelangelo',
    emoji: '🐒',
    mood: '😁',
    hunger: 100,
    isAlive: true
  },
  {
    name: 'Rodney',
    emoji: '🐍',
    mood: '😁',
    hunger: 100,
    isAlive: true
  },
]


let money = 0

// SECTION functions


// REVIEW we can pass this this function to a find instead of writing an anonymous function
// function returnLilBabyJeremy(animal) {
//   if (animal.name == 'Little Baby Jeremy') {
//     return true
//   }
// }


// NOTE no longer need this function, refactored into feedAnimal function
function feedLilBabyJeremy() {
  // ✅ get lil baby jeremy out of the array

  // REVIEW 3 different ways to have the same outcome
  // let lilBabyJeremy = animals.find(returnLilBabyJeremy)
  // let lilBabyJeremy = animals[0]
  let jeremy = animals.find(animal => animal.name == 'Little Baby Jeremy')


  // NOTE truthy falsey. if jeremy is undefined, the codeblock inside of the if statement runs
  // REVIEW truthy: https://developer.mozilla.org/en-US/docs/Glossary/Truthy
  // REVIEW falsy: https://developer.mozilla.org/en-US/docs/Glossary/Falsy 
  if (!jeremy) {
    console.error("Your code doesn't work")
    // NOTE end function
    return
  }



  // ✅ make sure he is alive
  if (!jeremy.isAlive) {
    // NOTE end function
    return
  }

  // ✅ make hunger go up
  jeremy.hunger++

  // ✅ make sure hunger doesn't go above 100
  // NOTE clamp
  if (jeremy.hunger >= 100) {
    jeremy.hunger = 100
  }

  console.log(jeremy);
}


function feedAnimal(name) {
  let foundAnimal = animals.find(animal => animal.name == name)

  if (!foundAnimal) {
    console.error(`No animal found with the name of ${name}`);
    return
  }

  if (!foundAnimal.isAlive) {
    console.error(`Sorry, ${foundAnimal.name} went to the farm to retire`);
    return
  }

  foundAnimal.hunger++

  if (foundAnimal.hunger >= 100) {
    foundAnimal.hunger = 100
  }
  console.log(foundAnimal);

  drawAnimals()
}

// NOTE refactored this into drawAnimals, so this is no longer needed
function drawJeremy() {

  let jeremyElem = document.getElementById('Jeremy')

  let jeremySpan = jeremyElem.querySelector('p > span')

  console.log(jeremySpan);

  let jeremy = animals[0]

  // @ts-ignore
  jeremySpan.innerText = jeremy.hunger
}

function drawAnimals() {
  animals.forEach(animal => {

    let animalElem = document.getElementById(animal.name)

    let animalSpan = animalElem.querySelector('p > span')

    if (!animal.isAlive) {
      animalSpan.classList.add('text-danger')


      let animalEmoji = animalElem.querySelector('.animal')
      // @ts-ignore
      animalEmoji.innerText = animal.emoji
    }

    // console.log(animalSpan);

    // @ts-ignore
    animalSpan.innerText = `${animal.hunger} - ${animal.mood}`
  })

}

function drawMoney() {
  // @ts-ignore
  document.getElementById('money').innerText = money
}

function decreaseHunger() {

  // NOTE for each is now handling this
  // animals[0].hunger -= 10
  // animals[1].hunger -= 10
  // animals[2].hunger -= 10

  animals.forEach(animal => {
    if (animal.isAlive) {
      animal.hunger -= 10
    }

    if (animal.hunger > 80) {
      animal.mood = '😁'
    }
    else if (animal.hunger > 60) {
      animal.mood = '😐'
    }
    else if (animal.hunger > 30) {
      animal.mood = '☹️'
    }
    else if (animal.hunger > 0) {
      animal.mood = '😫'
    }
    else {
      animal.mood = '🧑‍🌾'
    }






    if (animal.hunger < 0) {
      animal.isAlive = false
      animal.emoji = '🧑‍🌾'
    }

  })

  drawAnimals()
}

function getPaid() {


  // NOTE create a scoped variable so that we can add to this using our forEach
  let paycheck = 0

  animals.forEach(animal => {


    // NOTE switch statement takes in one value as its key, and runs cases against that key
    switch (animal.mood) {
      // NOTE this case case checks to see if the key that we passed down (animal.mood) matches with the value '😁'
      case '😁':
        // NOTE if the above case evaluated as true, this code block is run
        console.log('The animal is super happy!');
        paycheck += 50
        // NOTE break tells the switch statement to stop running
        break;

      case '😐':
        console.log('The animal is neutral');
        paycheck += 40
        break;

      case '☹️':
        console.log('The animal is not happy');
        paycheck += 20
        break;

      case '😫':
        console.log('The animal is getting ready to go to the farm');
        paycheck += 1
        break;


      // NOTE if none of our cases match the above key (animal.mood), the default runs
      default:
        console.log('The animal is probably at the farm');
        paycheck -= 20

        break;
    }


  })

  // @ts-ignore
  document.getElementById('paycheck').innerText = paycheck

  money += paycheck

  console.log('here is my money:', money);

  drawMoney()

}

// NOTE we set this up at the end of lecture to fire off when our oncontextmenu event is fired off from our HTML
function rightClick() {
  window.event.preventDefault()
  console.log('you right clicked');
}


// NOTE we pass a function definition as the instructions for setInterval to run
// NOTE this setInterval will call our decreaseHunger function every 2000 milliseconds
setInterval(decreaseHunger, 2000)

// NOTE this setInterval will call our getPaud function every 6000 milliseconds
setInterval(getPaid, 6000)

drawAnimals()