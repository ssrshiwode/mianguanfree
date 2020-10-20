export default function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
