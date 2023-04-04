const Mongoose = require('mongoose');
const { BSONTypeError } = require('bson');

const requiredRequestParamsNotFound = (res, module, params) => {
    return res.json({
        message: `Following request params not found in module ${module}.`,
        data: params,
        success: false
    })
}

const requiredRequestBodyNotFound = (res, module, params) => {
    return res.json({
        message: `Following request body not found in module ${module}.`,
        data: params,
        success: false
    })
}

const idNotValidBsonObjectId = (res, module, params) => {
    return res.json({
        message: `ID not a valid ObjectId.`,
        data: params,
        success: false
    })
}

const isValidObjectId = (id) => {
    let bsonId;
    try {
        bsonId = Mongoose.Types.ObjectId(id)
    } catch (err) {
        if (err.name === 'BSONTypeError') {
            return false
        }
    }
    return true
}


module.exports = {
    requiredRequestBodyNotFound,
    requiredRequestParamsNotFound,
    isValidObjectId,
    idNotValidBsonObjectId
}