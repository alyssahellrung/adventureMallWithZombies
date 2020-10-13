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
    text: "You wake up in a strange place and you see a jar of blue goo near you.",
    options: [
      {
        text: "Take goo",
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: "Leave the goo",
        nextText: 2
      }
    ]
  },
  { 
    id: 2,
    text: "You venture forth in search of answers to where you are when you come across a merchant.",
    options: [
      {
        text: "Trade the goo for a sword",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: "Trade the goo for a shield",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: "Ignore the merchant",
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: "After leaving the merchant, you start to feel tired and stumble upon a small town next to a dangerous looking castle.",
    options: [
      {
        text: "Explore the castle",
        nextText: 4
      },
      {
        text: "Find a room in the town to sleep in",
        nextText: 5
      },
      {
        text: "Find some hay in a stable to sleep in",
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: "You are so tired that you fall asleep while exploring the castle and you are killed by a terrible monster in your sleep.",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: "Without any money to buy a room, you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: "You wake up well rested and full of energy, ready to explore the nearby castle.",
    options: [
      {
        text: "Explore the castle",
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: "While exploring the castle you come across a horrible monster in your path.",
    options: [
      {
        text: "Try to run",
        nextText: 8
      },
      {
        text: "Attack it with your sword",
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text:"Hide behind your shield",
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: "Throw the blue goo at it",
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: "Your attempts to run are in vain. The monster easily catches you.",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: "You foolishly thought this monster could be slain with a single sword?",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: "The monster laughs as you hide behind your shield. He eats you.",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: "You throw your jar of blue goo at the monster and it explodes! After the dust settles, you see the monster has been destroyed. Seeing your victory, you decide to claim this castle as your own. You live out the rest of your days there.",
    options: [
      {
        text: "Congratulations! Play again?",
        nextText: -1
      }
    ]
  }
]

startGame()