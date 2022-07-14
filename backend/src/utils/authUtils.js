function getUserId(req) {
	if (req.cookies){
		if (req.cookies.userId) return req.cookies.userId;
	}
	if (req.body.userId) return req.body.userId;
	return undefined;
}

export { getUserId };
