module.exports = (mongo, mongoPaginate) => {
    var schema = new mongo.Schema(
        {
            title: {type: String, required: true},
            content: {type: String, required: true},
            is_publish: {type: Boolean, default: false},
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now},
        }
    )

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })
    schema.plugin(mongoPaginate)

    const Article = mongo.model("articles", schema)
    return Article
}