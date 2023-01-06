export const Player = (username, color, type, id) => {
  return { username, color, type, id };
};

export const PlayerFactory = () => {
  let _id = 1;

  function create(username, color, type) {
    return Player(username, color, type, _id++);
  }
  return { create };
};
