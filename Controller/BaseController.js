class Controller {
  get = (req, res) => {
    res.send("get");
  };
  post = (req, res) => {
    res.send("post");
  };
  update = (req, res) => {
    res.send("update");
  };
  delete = (req, res) => {
    res.send("delete");
  };
  createServicesModel = () => {};
}

module.exports = Controller;
