/** Defers geometric DOM reads until after the next paint to avoid forced reflow. */
export function scheduleLayoutRead(callback: () => void): () => void {
  let innerId = 0;

  const outerId = requestAnimationFrame(() => {
    innerId = requestAnimationFrame(callback);
  });

  return () => {
    cancelAnimationFrame(outerId);
    cancelAnimationFrame(innerId);
  };
}
