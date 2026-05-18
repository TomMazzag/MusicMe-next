export function toggleLike(songId: string): Promise<void> {
  return fetch(`/api/song/${songId}/like`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to toggle like, status code: ${response.status}`);
      }
    })
    .catch((err) => {
      console.error('Error toggling like', err);
      throw err;
    });
}
