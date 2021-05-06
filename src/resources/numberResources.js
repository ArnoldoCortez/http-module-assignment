// Modules
const { NumberControllers } = require('../controllers');

const NumberResources = (req, res) => {
  const { url, method } = req;

  const methods = {
    'GET': {
      getNumber: NumberControllers.getNumber,
      multiplyNumber: NumberControllers.multiplyNumber,
    },
    'POST': NumberControllers.createNumber,
    'PUT': NumberControllers.updateNumber,
  }

  if (methods[method]){
    if (method === 'GET') {
      [,domain, uriParam] = url.split('/');
      if (uriParam) {
        if (!isNaN(Number(uriParam))) {
          methods[method].multiplyNumber(req, res, Number(uriParam));
        } else{
          res.statusCode = 400;
          res.end(JSON.stringify({message: 'The multiplier is not a number!!!'}));
        }
      } else {
        methods[method].getNumber(req, res);
      }
    } else {
      methods[method](req, res);
    }
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({message: 'The method is not valid for this path!!!'}));
  }
};

module.exports = NumberResources;