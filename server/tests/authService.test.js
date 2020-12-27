const AuthService = require('../services/auth')
const db = require('../database/models')

describe('it should test auth service', () => {
  it('should register a user', async (done) => {
    const newUser = await AuthService.createUser('a@a.com', 'a')
    expect(typeof newUser).toBe('object')
    const foundUser = await db.User.findOne({where: {email: newUser.email}})
    expect(typeof foundUser).toBe('object')
    await db.User.destroy({where: {id: foundUser.id}})
    done()
  })

  it('it should login a user', async (done) => {
    const token = await AuthService.loginUser('test@test.com', 'test')
    expect(typeof token.token).toBe('string')
    done()
  })
})

afterAll(async done => {
  await db.sequelize.close()
  done()
});