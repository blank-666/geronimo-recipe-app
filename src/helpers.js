export function formatTime(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const newTime =
    minutes !== 0
      ? `${hours} ${hours > 1 ? "hours" : "hour"} ${minutes} minutes`
      : `${hours} ${hours > 1 ? "hours" : "hour"}`;
  return newTime;
}
