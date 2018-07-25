import axios from 'axios'

const getRandomRace = newChar => {
  var race = Math.floor(Math.random() * 9) + 1
  var profession = Math.floor(Math.random() * 12) + 1
  var gender = Math.floor(Math.random() * 2) + 1
  var currentGender
  var sr
  var newSR
  var currentSR
  var currentJob
  var newCharacter
  var baseAttr = []
  var modAttr = []
  var combAttr = []
  var hp
  var charHitDie
  var charProf = []
  var choiceArray = []

  const racePromise = axios.get('http://www.dnd5eapi.co/api/races/' + race).then(raceResponse => {
    const currentRace = raceResponse.data
    return currentRace
  })

  const classPromise = axios.get('http://www.dnd5eapi.co/api/classes/' + profession).then(classResponse => {
    let newJob = classResponse.data
    return newJob
  })

  return axios.all([racePromise, classPromise]).then(responses => {
    const currentRace = responses.find(x => x.url.indexOf('races') > -1)
    const newJob = responses.find(x => x.url.indexOf('classes') > -1)

    // Process Race Response
    console.log(currentRace.name)

    modAttr = currentRace.ability_bonuses
    baseAttr = [15, 14, 13, 12, 10, 8]
    for (var i = 0; i < 6; i++) {
      var newVal = baseAttr[i] + modAttr[i]
      combAttr.push(newVal)
    }
    console.log('Attribute Modifiers:', modAttr)
    console.log('Base Attributes:', baseAttr)
    console.log('Combined Attributes:', combAttr)
    console.log('-------------------------------------')
    console.log('Race:', currentRace.name)
    if (currentRace.subraces) {
      if (currentRace.subraces.length === 0) {
        console.log('Subrace: N/A')
        currentSR = 'N/A'
      } else if (currentRace.subraces.length === 1) {
        newSR = currentRace.subraces[0]
        console.log('Subrace:', newSR.name)
        currentSR = newSR.name
      } else {
        sr = Math.floor(Math.random() * currentRace.subraces.length)
        newSR = currentRace.subraces[sr]
        console.log('Subrace:', newSR.name)
        currentSR = newSR.name
      }
    }
    currentGender = gender === 1 ? 'Male' : 'Female'
    console.log(`Gender: ${currentGender}`)

    // Process Class Response
    console.log('Job:', newJob.name)
    currentJob = newJob.name
    charHitDie = newJob.hit_die
    hp = charHitDie + combAttr[2]
    console.log('HP:', hp)

    var profLength = currentRace.starting_proficiencies.length
    for (i = 0; i < profLength; i++) {
      var cp = currentRace.starting_proficiencies[i]
      charProf.push(cp.name)
    }

    if (currentRace.starting_proficiency_options) {
      var profOpsLength = currentRace.starting_proficiency_options.from.length
      console.log(profOpsLength)
      var numProfOps = currentRace.starting_proficiency_options.choose
      console.log(numProfOps)
      var rprof = Math.floor(Math.random() * profOpsLength)
      var newrprof = currentRace.starting_proficiency_options.from[rprof]
      console.log(newrprof.name)
      charProf.push(newrprof.name)
    }
    var classProfLength = newJob.proficiencies.length
    for (i = 0; i < classProfLength; i++) {
      cp = newJob.proficiencies[i]
      charProf.push(cp.name)
    }
    var choices = newJob.proficiency_choices[0]
    var numChoices = choices.choose
    console.log(numChoices)
    console.log(choices.from.length)
    for (i = 0; i < choices.from.length; i++) {
      choiceArray.push(choices.from[i].name)
    }
    console.log(choiceArray.length)
    var chosenArray = []
    for (i = 0; i < numChoices; i++) {
      var rnd = Math.floor(Math.random() * (choiceArray.length - 1))
      chosenArray.push(choiceArray[rnd])
      choiceArray.splice(rnd, 1)
    }

    for (i = 0; i < chosenArray.length; i++) {
      charProf.push(chosenArray[i])
    }

    newCharacter = {
      characterHP: hp,
      characterGender: currentGender,
      characterRace: currentRace.name,
      characterSR: currentSR,
      characterJob: currentJob,
      characterAttr: combAttr,
      characterProf: charProf
    }
    const newChar = newCharacter
    console.log(newChar)
    console.log('--------------------')
    console.log('--------------------')
    console.log('--------------------')
    console.log(newChar.characterHP)
    console.log('--------------------')
    console.log(newChar.characterGender)
    console.log('--------------------')
    console.log(newChar.characterRace)
    console.log('--------------------')
    console.log(newChar.characterSR)
    console.log('--------------------')
    console.log(newChar.characterJob)
    console.log('--------------------')
    console.log(newChar.characterAttr)
    console.log('--------------------')
    console.log(newChar.characterProf)
    console.log('--------------------')
    console.log('--------------------')
    console.log(newChar)
    return newChar
  })
}

export { getRandomRace }
