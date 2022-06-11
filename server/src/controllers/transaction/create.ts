import { transactions_model } from '../../db';

const create: Controller = async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.body.amount || !req.body.type || !req.body.partyName) {
      return res.status(400).json({
        error: true,
        message: 'Amount,type and partyName are required',
      });
    }
    const user_id = req['decode'].userId;
    const transaction = await transactions_model.create({
      amount: req.body.amount,
      type: req.body.type,
      partyName: req.body.partyName,
      user_id,
    });
    return res.status(200).json({
      success: true,
      message: 'Transaction created successfully',
      data: { transaction },
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: true,
        message: 'Transaction already exists',
      });
    }
    next(error);
  }
};
export default create;
