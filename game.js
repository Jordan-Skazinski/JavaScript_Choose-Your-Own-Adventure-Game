const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('options-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode=> textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}
function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange palce and see a jar of blue goo near you.',
        options: [
            {
                text: 'Take goo',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'Leave the goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You explore around the area in search of answers. Eventualy you come across a merchant.',
        options: [
            {
                text:'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState:  { blueGoo: false, sword: true },
                nextText: 3

            },
            {
                text:'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState:  { blueGoo: false, shield: true },
                nextText: 3

            },
            {
                text:'Ignore the merchant',
                nextText: 3

            },
        ]
    },
    {
        id: 3,
        text: 'Leaving the merchant behind you spot a small town next to a odd looking castle',
        options: [
            {
                text:'Explore Castle',
                nextText: 4

            },
            {
                text:'Find an inn to sleep.',
                nextText: 5

            },
            {
                text:'Find anywere to sleep for the night',
                nextText: 6

            },
        ]
    },
    {
        id: 4,
        text: 'You make it to the castle only to find it being guarded by two soldiers',
        options: [
            {
                text:'Talk to the soldiers',
                nextText: 7

            },
            {
                text:'Go back to the town',
                nextText: 3

            },
        ]
    },
    {
        id: 5,
        text: 'You make it to the Inn, but you have no money to spend on a room.',
        options: [
            {
                text:'Find anywere to sleep for the night',
                nextText: 6

            },
            {
                text:'trade the goo for a room',
                requiredState: (currentState) => currentState.blueGoo,
                setState:  { blueGoo: false },
                nextText: 8

            },
        ]
    },
    {
        id: 8,
        text: 'You are given a nice room to stay in for the night.',
        options: [
            {
                text:'Sleep',
                nextText: 9

            },
            {
                text:"Don't sleep",
                setState: { tired: true },
                nextText: 10

            },
        ]
    },
    {
        id: undefined,
        text: '',
        options: [
            {
                text:'',
                nextText: undefined

            },
            {
                text:'',
                nextText: undefined

            },
        ]
    },

]
startGame()