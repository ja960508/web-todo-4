function getUserId(req) {
  return req.cookies?.userId ?? req.body.userId;
}

export { getUserId };
