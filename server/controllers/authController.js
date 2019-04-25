const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const { username, password, isAdmin } = req.body;
    const db = req.app.get('db');

    let result = await db.get_user([username]);
    const existingUser = result[0];

    if(existingUser) {
      res.status(409).send('Username taken nerd');
    }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

    let registeredUser = await db.register_user([isAdmin, username, hash]);
    let user = registeredUser[0];

    req.session.user = {
      isAdmin: user.is_admin, 
      username: user.username,
      id: user.id
    };

    res.status(201).send(req.session.user);
  }
}