import axios from 'axios';

export default {
  getCharacters: function() {
    return axios.get("/api/characters");
  },
  saveCharacter: function(characterData) {
    return axios.post("/api/characters", characterData);
  }
};
