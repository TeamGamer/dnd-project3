import axios from 'axios'

const getRandomRace = () => {
  var race = Math.floor(Math.random() * 9) + 1
  axios.get('http://www.dnd5eapi.co/api/races/' + race).then(response => {
    let currentRace = response.data
    console.log(currentRace.name)
  })
}

export { getRandomRace }
