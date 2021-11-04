module.exports = (mongo, mongoPaginate) => {
    var schema = new mongo.Schema(
        {
            article_id: {type: String, required: true},
            name: {type: String, required: true},
            email: {type: String, required: true},
            comment: {type: String, default: false},
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now},
        }
    )

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })
    // schema.plugin(mongoPaginate)

    const Comment = mongo.model("comments", schema)
    return Comment
}