// eslint-disable-next-line prefer-destructuring
const TICKET_API_URL = process.env.TICKET_API_URL;

export default async function request(path, options) {
  const req = new Request(TICKET_API_URL + path, options);
  const resp = await fetch(req);
  if (resp.ok) {
    const json = await resp.json();
    return json;
  }

  throw new Error(resp.statusText);
}
