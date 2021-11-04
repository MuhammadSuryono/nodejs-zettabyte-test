const db = require('../model')
const comments = db.comments
const response = require('../response')
const utils = require('../utils')

exports.create = (req, res) => {
    const data = req.body
    if (!data.name || !data.email || !data.article_id) {
        res.status(400).send(response.BuildResponse(400, "Content can not be empty", data))
        return
    }

    if (!utils.IsEmail(data.email)) {
        res.status(400).send(response.BuildResponse(400, "Format email unsupported", data))
        return
    }

    const comment = new comments({
        article_id: data.article_id,
        name: data.name,
        email: data.email,
        comment: data.comment,
    })

    comment.save(comment).then(dataComment => {
        res.status(200).send(response.BuildResponse(200, "Success add comment", data))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't add comment", data))
    })
}

exports.update = (req, res) => {
    const data = req.body
    const {id} = req.params
    if (!data) {
        res.status(400).send(response.BuildResponse(400, "Content can not be empty", data))
        return
    }

    comments.findByIdAndUpdate(id, data, { userFindAndModify: false}).then(resUpdate => {
        if (!resUpdate) res.status(400).send(response.BuildResponse(400, `Can't update comment with id ${id}`))
        else res.status(200).send(response.BuildResponse(200, "Comment was updated successfully", data))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't update comment with id " + id, data))
    })

}

exports.delete = (req, res) => {
    const {id} = req.params

    comments.findByIdAndRemove(id).then(resDelete => {
        if (!resDelete) res.status(400).send(response.BuildResponse(400, `Can't delete comment with id ${id}`))
        else res.status(200).send(response.BuildResponse(200, "Comment was deleted successfully"))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't delete comment with id " + id))
    })
}

exports.findAll = (req, res) => {
    comments.find().sort({created_at: "desc"}).then(data => {
        res.status(200).send(response.BuildResponse(200, "Success retrieve data", data))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't get comment"))
    })
}

exports.findOne = (req, res) => {
    const {id} = req.params

    comments.findById(id).then(data => {
        if (!data) res.status(404).send(response.BuildResponse(404, "Data comment not found for id" + id))
        else res.status(200).send(response.BuildResponse(200, "Success retrieve data", data))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't get comment"))
    })
}

exports.findByArticle = (req, res) => {
    const {idArticle} = req.params

    comments.find({article_id: idArticle}).sort({created_at: "asc"}).then(data => {
        if (!data) res.status(404).send(response.BuildResponse(404, "Data comment not found for id" + idArticle))
        else res.status(200).send(response.BuildResponse(200, "Success retrieve data", data))
    }).catch(err => {
        res.status(500).send(response.BuildResponse(500, err.message || "Can't get comment"))
    })
}