// Modules
const { NumberResources, ResetResources } = require('../resources');

const myRouter = (req, res) => {
  const { url } = req;

  [,domain, uriParam] = url.split('/');

  const routes = {
    'myNumber': NumberResources,
    'reset': ResetResources,
  };

  if (routes[domain]) {
    routes[domain](req, res);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({
      message: "Resource not found",
    }));
  }
};

module.exports = myRouter;