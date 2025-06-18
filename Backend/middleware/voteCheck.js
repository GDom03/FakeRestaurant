import { MyException } from "../utils/MyException.js";
import { check, query, validationResult } from 'express-validator';


export async function checkIsUpVoteField(req, res, next) {
    await check('isUpVote')
        .exists().withMessage('isUpVote field is required')
        .bail()
        .isBoolean().withMessage('isUpVote must be a boolean')
        .toBoolean()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    // Salva il valore validato in un campo locale di `req`
    req.locals = req.locals || {}; // inizializza se necessario
    req.locals.isUpVote = req.body?.isUpVote || req.query?.isUpVote || req.params?.isUpVote;

    next();
}