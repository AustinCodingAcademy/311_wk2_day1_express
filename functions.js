let {users} = require('./state')

const getUsers = () => {
    return users
}

const getUser = (id) => {
    users.forEach(user => {
        if(user._id === id) {
            return user
        }
    })
    return null
}

const postUser = (user) => {

}






module.exports = {
    getUsers,
    getUser,
}