exports.getAllUsers = async (req, res, next) => {
    res.send('Get all users route');
}

exports.createNewUser = async (req, res, next) => {
    res.send('Create new user route');
}

exports.getUserById = async (req, res, next) => {
    res.send('Get user by id route');
}