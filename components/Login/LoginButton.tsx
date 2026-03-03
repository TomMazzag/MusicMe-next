'use client';
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const LoginButton = () => {
  const authorize = async () => {
    try {
      window.location.href = `${backend_url}/auth/login`;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className="btn btn-outline btn-primary" onClick={authorize} onTouchStart={authorize}>
      Click here to begin
    </button>
  );
};
