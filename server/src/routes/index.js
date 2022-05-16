module.exports = (app) => {
    app.get('/', (req, res) => {
      res.status(200).send({
        message: 'Welcome to the Issue Tracker API. Restricted API! Do Not Proceed.'
      });
    });
    
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/project', authenticate, project);
  
    app.use((req, res) => {
      res.status(404).json({
        status: 404,
        message: 'The requested URL ' + req.originalUrl + ' was not found on the server.'
      });
    });
    
};
  