exports.handler = async (event, context) => {
    const guides = [
        { title: 'Beat all Zelda Bosses Like a boss', author: 'Mario' },
        { title: 'Mario kart shorcuts You Never Knew Exited', author: 'luigi' },
        { title: 'Ultimate street fither guide', author: 'chun-li' },
    ];

    if (context.clientContext) {
        return {
            statusCode: 200,
            body: JSON.stringify(guides),
        };
    }

    return {
        statusCode: 401,
        body: JSON.stringify({
            mssg: 'ah, ah, ah you must be logged in to see this',
        }),
    };
};
