const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement("button")
      button.innerText = option.text
      button.classList.add("btn")
      button.addEventListener("click", () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "Your mom drops you off at the mall and someone offers you a free Orange Julius sample when you walk through the doors.",
    options: [
      {
        text: "Take Orange Julius",
        setState: { julius: true },
        nextText: 2
      },
      {
        text: "Leave the Orange Julius",
        nextText: 2
      }
    ]
  },
  { 
    id: 2,
    text: "You head to the food court to meet your friends, Heather and Courtney. They already have snacks and ask if you want to trade.",
    options: [
      {
        text: "Trade your Orange Julius for Heather's froyo.",
        requiredState: (currentState) => currentState.julius,
        setState: { julius: false, froyo: true },
        nextText: 3
      },
      {
        text: "Trade your Orange Julius for Courtney's soft pretzel.",
        requiredState: (currentState) => currentState.julius,
        setState: { julius: false, pretzel: true },
        nextText: 3
      },
      {
        text: "Say, 'This Orange Julius is bodacious. I don't want to trade!'",
        requiredState: (currentState) => currentState.julius,
        nextText: 3
      },
      {
        text: "Tell them you don't have anything to trade.",
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: "After leaving the food court, you can't wait to go shopping.",
    options: [
      {
        text: "Go to B.Dalton to check out the new Sweet Valley High books.",
        nextText: 4
      },
      {
        text: "Go to Afterthoughts to find a 'best friends' necklace.",
        nextText: 5
      },
      {
        text: "Go to the Esprit store to get a pair of acid wash, high-waisted jeans.",
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: "Bummer, you've already read all of the SVH books and B.Dalton doesn't have the newest one in stock yet. You decide to look for a new Christopher Pike book instead when BAM! A zombie finds you and eats your brain!",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: "You find a really cute 'best friends' necklace, but then Courtney and Heather both assume the other half is for them. They get so mad at you that they buy their own 'best friends' necklace and leave you alone. A zombie appears from behind the ear-piercing station and eats your brain!",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: "You find the perfect pair of jeans. They look exactly like the ones all of the popular girls at school wear. Unfortunately, they were expensive and you have almost no money left. Heather and Courtney convince you to go to Sam Goody anyway.",
    options: [
      {
        text: "Go to Sam Goody",
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: "You're in Sam Goody with headphones on, listening to selections from Debbie Gibson's 'Out of the Blue' when you feel a tap on your shoulder. Thinking it's Heather or Courtney, you turn and look. It is Heather and Courtney, but they are different. They've been turned into zombies!",
    options: [
      {
        text: "Try to run",
        nextText: 8
      },
      {
        text: "Throw your froyo at them",
        requiredState: (currentState) => currentState.froyo,
        nextText: 9
      },
      {
        text:"Offer your pretzel to them",
        requiredState: (currentState) => currentState.pretzel,
        nextText: 10
      },
      {
        text: "Throw the Orange Julius at them",
        requiredState: (currentState) => currentState.julius,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: "Your attempts to run are in vain. Heather was on the track team! Even now she easily catches you and turns you into a brain-hungry zombie!",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: "Why would froyo stop zombies? They want your brain! The zombie girls catch you and turn you into a zombie too!",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: "Zombie Heather and Zombie Courtney laugh at your ridiculous attempt to appease them. They don't want pretzels, they want BRAINS! They grab you and turn you into a zombie!",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: "You throw your Orange Julius at the zombie girls and the citric acid burns their skin! While they are distracted, you pull a fire alarm. Thinking there is a fire, everyone evacuates. You watch as Zombie Heather and Zombie Courtney melt from the power of the Orange Julius. Eventually they disappear entirely. You evacuate with everyone else, call your mom from a payphone, and she picks you up and takes you home.",
    options: [
      {
        text: "Congratulations, you saved the mall! Play again?",
        nextText: -1
      }
    ]
  }
]

startGame()