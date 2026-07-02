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

/** Runs DOM writes in the frame after a deferred layout read. */
export function scheduleLayoutWrite(callback: () => void): () => void {
  let writeId = 0;

  const cancelRead = scheduleLayoutRead(() => {
    writeId = requestAnimationFrame(callback);
  });

  return () => {
    cancelRead();
    cancelAnimationFrame(writeId);
  };
}
