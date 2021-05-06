// Modules
const { ResetControllers } = require('../controllers');

const ResetResources = (req, res) => {
  const { method } = req;

  const methods = {
    'DELETE': ResetControllers.resetNumber,
  }

  if (methods[method]){
    methods[method](req, res);
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({message: 'The method is not valid for this path!!!'}));
  }
};

module.exports = ResetResources;