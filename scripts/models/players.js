export const Player = (username, color, type, id) => {
  return { username, color, type, id };
};

export const PlayerFactory = () => {
  let _id = 1;
  const defaultUsername = "Player";
  const defaultType = "human";
  const defaultColors = ["#FF0000", "#FFFF00"];

  function create(username, color, type) {
    if (!username) {
      username = defaultUsername + ` ${_id}`;
    }
    if (!color) {
      color = defaultColors[_id % defaultColors.length];
    }
    if (!type) {
      type = defaultType;
    }

    return Player(username, color, type, _id++);
  }

  return { create };
};

export const Players = () => {
  const array = [];
  let hash = {};

  function getById(id) {
    return array[hash[id.toString()]];
  }

  function getByIndex(index) {
    return array[index];
  }

  function getIdArray() {
    return Object.keys(hash);
  }

  function add(player) {
    hash[player.id] = array.length;
    array.push(player);
  }

  function remove(id) {
    const strId = id.toString();
    const index = hash[strId];
    array.splice(index, 1);
    delete hash[strId];
    for (let key of Object.keys(hash)) {
      if (hash[key] > index) {
        hash[key]--;
      }
    }
  }

  function length() {
    return array.length;
  }

  return {
    getById,
    getByIndex,
    getIdArray,
    add,
    remove,
    length,
  };
};

export const PlayersFactory = () => {
  function create(number) {
    const playerFactory = PlayerFactory();
    const players = Players();
    for (let i = 0; i < number; i++) {
      players.add(playerFactory.create());
    }
    return players;
  }
  return {
    create,
  };
};
