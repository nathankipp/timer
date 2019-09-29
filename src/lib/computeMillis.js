export default function computeMillis(time) {
  const [ sec, min ] = time.split(':').reverse();
  let ms = 0;

  if (sec) {
    ms += +sec * 1000;
  }
  if (min) {
    ms += +min * 1000 * 60;
  }

  return ms;
}
