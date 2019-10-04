export default function keyGen(key) {
  return {
    STORAGE_KEY: key,
    RUNNING_KEY: `${key}.running`,
    STARTED_KEY: `${key}.started`,
  };
}
