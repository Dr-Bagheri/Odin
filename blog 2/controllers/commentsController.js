exports.getCommentsByPost = (req, res) => {
    res.send("Comments fetched for a post");
};

exports.addCommentToPost = (req, res) => {
    res.send("Comment added to post");
};

exports.deleteComment = (req, res) => {
    res.send("Comment deleted");
};