// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    // console.log(token)

    res.status(statusCode).cookie("getCookie", token, options).json({
        success: true,
        user,
        token,
    });

    // console.log(token)

};

module.exports = sendToken;