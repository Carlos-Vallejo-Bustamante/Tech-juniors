module.exports = {
    userIsCompany: user => user.role === 'COMPANY',
    userIsUser: user => user.role === 'USER'
}