exports.getAllUsers = async (req, res, next) => {
    res.send('Get All Users Route');
}

exports.createNewUser = async (req, res, next) => {
    res.send('Create New User Route');
}

exports.getUserById = async (req, res, next) => {
    res.send('Get User By Id Route');
}