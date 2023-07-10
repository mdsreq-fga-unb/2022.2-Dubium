import Cookies from "js-cookie";

const isAuthenticated = () => {
  const token = Cookies.get("jwt");
  if (!token) return false;

  const [, payload] = token.split(".");
  const decodedPayload = atob(payload);
  const { exp } = JSON.parse(decodedPayload);

  return Date.now() < exp * 1000;
}

export default isAuthenticated;