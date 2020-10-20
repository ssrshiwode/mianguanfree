export default function getParams(attr) {
  const url = window.document.location.search.toString();
  let u = url.split("?");
  const params = {};
  if (typeof u[1] === "string") {
    u = u[1].split("&");
    for (var i in u) {
      var j = u[i].split("=");
      params[j[0]] = j[1];
    }
  }
  if (attr) return params[attr];
  return params;
}
