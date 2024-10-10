exports.getAllPosts = (req, res) => {
    res.send("All posts fetched");
};

exports.createPost = (req, res) => {
    res.send("Post created");
};

exports.getPostById = (req, res) => {
    res.send("Post fetched by ID");
};

exports.updatePost = (req, res) => {
    res.send("Post updated");
};

exports.deletePost = (req, res) => {
    res.send("Post deleted");
};