'use client';

export const LogoutLink = () => {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
      .then((res) => {
        if (res.ok) {
          window.location.href = '/';
        } else {
          console.error('Logout failed', { status: res.status, statusText: res.statusText });
        }
      })
      .catch((err) => {
        console.error('Logout error', err);
      });
  };
  return (
    <a onClick={() => handleLogout()}>
      Logout
    </a>
  );
};
