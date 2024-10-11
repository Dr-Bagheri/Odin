const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            include: { comments: true }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPost = async (req, res) => {
    const { title, content, authorId } = req.body;
    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
                published: false  // Default to not published
            }
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: { comments: true }
        });
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, published } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: { title, content, published }
        });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.post.delete({
            where: { id: parseInt(id) }
        });
        res.send('Post deleted');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};