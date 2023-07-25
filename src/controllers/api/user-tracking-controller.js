const db = require('../../models')
const Op = db.Sequelize.Op
const UserTracking = db.UserTracking

exports.create = async (req, res) => {

  try {
    if (typeof req.body.data !== 'object') {
      return res.status(200).send()
    }

    const log = {
      fingerprint: req.cookies.fingerprint ?? null,
      userId: req.userId,
      eventTime: req.body.data.eventTime ?? null,
      eventName: req.body.data.event ?? null,
      path: req.body.data.path ?? null,
      event: JSON.stringify(req.body.data)
    };

    await UserTracking.create(log)

    res.status(200).send();

  } catch (error) {
    res.status(500).send();
  }
}

exports.findUserLogs = async (req, res) => {
  
  const userId = req.params.userId ?? null;

  try{
    const data = await req.trackingService.findUserLogs(userId)

    return res.status(200).send(data)
  }catch(error){
    console.log(error)
  }
}
