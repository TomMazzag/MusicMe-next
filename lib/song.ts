import { BACKEND_URL_SERVER } from "./util";

export async function addSongView(songId: string) {
  const response = await fetch(`${BACKEND_URL_SERVER}/song/${songId}/view`, {
    method: 'POST',
    credentials: 'include',
  });

    if (!response.ok) {
        console.log('Failed to add song view', { status: response.status, statusText: response.statusText });
    }
}
