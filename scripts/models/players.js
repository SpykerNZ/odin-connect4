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

  function createMultiple(n) {
    const players = [];
    for (let i = 0; i < n; i++) {
      players.push(create());
    }
    return players;
  }
  return { create, createMultiple };
};
