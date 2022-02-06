const authenticator = async (ctx, next) => {
    // put custom authentication logic here
    await next();
}

export default authenticator;