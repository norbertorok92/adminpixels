export function isProduction() {
  const prod = process.env.NODE_ENV === 'production'

  return prod ? 'https://formal-triode-275316.ew.r.appspot.com' : `${process.env.BASE_URL}`
}

export function buildUrl(path) {
  const baseUrl = isProduction()
  return `${baseUrl}${path}`
}

export function extractUser(req) {
  if (!req.user) return null;
  const {
    firstName, lastName, email, bio, password, competencies, answersData, teams
  } = req.user;

  return {
    firstName, lastName, email, bio, password, competencies, answersData, teams
  };
}

export async function doPost(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data}),
  });
  if (res.success) {
    return res.status(200).send({ success: true, data: res.data });
  } else {
    res.status(400).send({ success: false, error: res.err });
  }
};


