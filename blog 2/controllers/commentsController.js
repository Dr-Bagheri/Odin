const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getCommentsByPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await prisma.comment.findMany({
            where: { postId: parseInt(postId) }
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addCommentToPost = async (req, res) => {
    const { postId } = req.params;
    const { content, username, email } = req.body;
    try {
        const newComment = await prisma.comment.create({
            data: {
                content,
                postId: parseInt(postId),
                username,
                email
            }
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        await prisma.comment.delete({
            where: { id: parseInt(commentId) }
        });
        res.send('Comment deleted');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};