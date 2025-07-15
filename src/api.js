const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function getPositions() {
  const res = await fetch(`${BASE_URL}/positions`);
  return res.json();
}

export async function subscribe(email, position) {
  const res = await fetch(`${BASE_URL}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, position })
  });
  return res.json();
}

export async function unsubscribe(email, position) {
  const res = await fetch(`${BASE_URL}/unsubscribe`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, position })
  });
  return res.json();
}
