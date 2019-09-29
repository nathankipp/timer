export default function getTime(ms) {
  const minutes = Math.trunc(ms/1000/60);
  const seconds = (ms/1000 - minutes*60)
    .toFixed(1)
    .replace(/^(\d\.\d)/, '0$1');

  return `${minutes}:${seconds}`;
}
