export default function uniqid () {
  return Math.random().toString(36).substr(2, 9);
}
