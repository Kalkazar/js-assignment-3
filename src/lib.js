export const chooseRandom = (array = [], numItems) => {
    let randomIndex = Math.floor(Math.random() * array.length)
    let randomIndices = new Array()
    let randomArray = new Array()
    if(array.length <= 1) {
        return array
    }
    if(numItems > array.length || !numItems) {
        numItems = randomIndex + 1
    }
    for(let i = 0; i < numItems; i++) {
        while(randomIndices.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * array.length)
        }
        randomIndices.push(randomIndex)
        randomArray.push(array[randomIndices[i]])
    }
    return randomArray
}

const promptCreator = (numQuestions = 1, numChoices = 2) => {
    let promptArray = []
    for (let i = 1; i <= numQuestions; i++) {
        promptArray.push(
            {
                type: 'input',
                name: `question-${(i)}`,
                message: `Enter question ${(i)}`
            }
        )
        for (let j = 1; j <= numChoices; j++) {
            promptArray.push(
                {
                    type: 'input',
                    name: `question-${(i)}-choice-${(j)}`,
                    message: `Enter answer choice ${(j)} for question ${(i)}`
                }
            )
        }
    }
    return promptArray
}

export const createPrompt = (options) => {
    if (!options) {
        return promptCreator(1, 2)
    }
    return promptCreator(options.numQuestions, options.numChoices)
}

export const createQuestions = (options) => {
    let questionArray = []
    if (options) {
        let choiceArray
        for (let i = 1; `question-${(i)}` in options; i++) {
            choiceArray = []
            for (let j = 1; `question-${(i)}-choice-${(j)}` in options; j++) {
                choiceArray.push(options[`question-${(i)}-choice-${(j)}`])
            }
            questionArray.push(
                {
                    type: 'list',
                    name: `question-${(i)}`,
                    message: options[`question-${(i)}`],
                    choices: choiceArray
                }
            )
        }
    }
    return questionArray
}