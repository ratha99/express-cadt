const jwt = require('jsonwebtoken')

function signJWT(id, email, username) {
    const token = jwt.sign(
        { id: id, email: email, username: username },
        process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPRIRE }
    )
    const refreshToken = jwt.sign(
        { id: id, email: email, username: username },
        process.env.JWT_REFESH_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPRIRE }
    )
    return {token, refreshToken}
}

module.exports = { signJWT }