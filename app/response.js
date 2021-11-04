const {BuildResponse} = require("./response");
exports.BuildResponse = (code = 200, message = "", data = {}) => {
    return {
        code: code,
        is_success: code >= 200 && code <= 399,
        message: message,
        data: data
    }
}

exports.BuildResponsePaginate = (data = {}) => {
    var paginate = {
        total_records: data.totalDocs,
        records: data.docs,
        total_page: data.totalPages,
        page: data.page > 0 ? 1 : data.page,
        offset: data.offset,
        limit: data.limit
    }

    return {
        code: 200,
        is_success: true,
        message: "Success retrieve data",
        data: paginate
    }
}