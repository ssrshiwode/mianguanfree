import request from "@/utils/request";
let defaultEnv = "debug";
export function initGame(userId, gameId, env = defaultEnv) {
  if (!userId || !gameId) return Promise.reject("params error");
  return request({
    url: "/game/H5/free/appGameData",
    method: "get",
    params: {
      userId,
      gameId,
      env
    }
  });
}

export function initGamewithNoGameData(userId, gameId, env = defaultEnv) {
  if (!userId || !gameId) return Promise.reject("params error");
  return request({
    url: "/game/H5/free/appGameDataWithNoGameData",
    method: "get",
    params: {
      userId,
      gameId,
      env
    }
  });
}

export function appSubmit(userId, gameId, moduleId, value, env = defaultEnv) {
  if (!userId || !gameId || !moduleId) return Promise.reject("params error");
  return request({
    url: "/game/H5/free/appSubmit",
    method: "post",
    data: {
      userId,
      gameId,
      moduleId,
      value,
      env
    }
  });
}

export function getGameDetail(gameId) {
  if (!gameId) return Promise.reject("params error");
  return request({
    url: "/game/H5/getGameDetailByGameId",
    method: "get",
    params: {
      gameId
    }
  });
}

export function getBackpack(userId, gameId) {
  if (!userId || !gameId) return Promise.reject("params error");
  return request({
    url: "/game/H5/free/getUserGameBag",
    method: "get",
    params: {
      userId,
      gameId
    }
  });
}
