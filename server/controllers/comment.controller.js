const Comments = require('../models/commentModel');
const { ObjectId } = require('mongodb');
const addComment = async (req, res) => {
	try {
		const { productId, content, user } = req.body;

		// let date = new Date();
		// let dateFormat = `${date.getDate()}-${
		// 	date.getMonth() + 1
		// }-${date.getFullYear()} ${date.getHours()}-${date.getMinutes()}`.toString();
		const newComment = new Comments({
			user,
			content,
			productId,
			date: Date.now(),
		});

		if (req.query.reply) {
			console.log('REPLY');
			const { _id, user, content, date } = newComment;

			const comment = await Comments.findById({ _id: req.query.id });
			//console.log('comment', comment);
			if (comment) {
				comment.reply.push({ _id, user, date, content });
				await comment.save();
				console.log(comment);
			}
		} else {
			console.log('Comment_new', newComment);
			await newComment.save();
		}

		res.json({ message: 'success comment' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getComment = async (req, res) => {
	try {
		//const { productId, content, user } = req.body;

		const listComment = await Comments.find({
			productId: req.query.productId,
		}).populate({
			path: 'user',
			select: 'name type',
		});
		// const newComment = await Comments({
		// 	user,
		// 	content,
		// 	productId,
		// 	date: Date.now(),
		// });

		//console.log(listComment);

		res.json(listComment);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteComment = async (req, res) => {
	try {
		if (req.query.node) {
			const comment = await Comments.findByIdAndUpdate(
				{ _id: req.query.id },
				{ $pull: { reply: { _id: ObjectId(req.query.node) } } }
			);
		} else {
			const comment = await Comments.deleteOne({ _id: req.query.id });
		}

		//console.log(comment);
		res.json({ message: 'delete success' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	addComment,
	getComment,
	deleteComment,
};
