import { transactions_model } from "../../db";

const list:Controller = async (req, res, next) => {
    try {
        const transactions = await transactions_model.findAll({
            where: {
                user_id: req['decode'].userId,
            },
        });
        return res.status(200).json({
            success: true,
            message: 'Transactions fetched successfully',
            data: { transactions },
        });
    } catch (error) {
        next(error);
    }
}
export default list;