import request from "@/utils/request";

export function initGame(userId, gameId, env = "debug") {
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

export function initGamewithNoGameData(userId, gameId, env = "debug") {
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

export function appSubmit(userId, gameId, moduleId, value, env = "debug") {
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
