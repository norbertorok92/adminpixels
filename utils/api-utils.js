export function extractUser(req) {

  if (!req.user) return null;
  const {
    firstName, lastName, email, password, confirmPassword,
  } = req.user;

  return {
    firstName, lastName, email, password, confirmPassword,
  };
}
