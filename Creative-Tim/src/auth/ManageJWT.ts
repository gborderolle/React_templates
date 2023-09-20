import { authResponse, claim } from "./auth.model";

const tokenKey = "token";
const tokenExpiration = "token-expiration";

export function saveTokenLocalStorage(authentication: authResponse) {
  localStorage.setItem(tokenKey, authentication.token);
  localStorage.setItem(tokenExpiration, authentication.expiration.toString());
}

export function getClaims(): claim[] {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    return [];
  }
  const expiration = localStorage.getItem(tokenExpiration)!;
  const expirationDate = new Date(expiration);

  if (expirationDate <= new Date()) {
    logout();
    return [];
  }
  const dataToken = JSON.parse(atob(token.split(".")[1]));
  const response: claim[] = [];
  for (const property in dataToken) {
    response.push({ name: property, value: dataToken[property] });
  }
  return response;
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(tokenExpiration);
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}
