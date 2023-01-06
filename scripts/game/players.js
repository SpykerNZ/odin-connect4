export const Player = (username, type, id) => {
  return { username, type, id };
};

export const PlayerFactory = () => {
  let _id = 1;
  const defaultUsername = "Player";
  const defaultType = "human";

  function create(username, type) {
    if (!username) {
      username = defaultUsername + ` ${_id}`;
    }
    if (!type) {
      type = defaultType;
    }
    return Player(username, type, _id++);
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
