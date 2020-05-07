export function buildUrl(path) {
  return `${process.env.BASE_URL}${path}`
}

export function extractUser(req) {
  if (!req.user) return null;
  const {
    firstName, lastName, email, bio, password
  } = req.user;

  return {
    firstName, lastName, email, bio, password
  };
}
