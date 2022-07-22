import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/loader";

const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id);
		setPost(response.data);
	});

	const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
		const response = await PostService.getCommentsByPostId(id);
		setComments(response.data);
	});

	useEffect(() => {
		fetchPostsById(params.id);
		fetchComments(params.id)
	}, []);


	return (
		<div>
			<h1>
				Детальная поста id = {params.id}
			</h1>
			{isLoading
				? <Loader/>
				: <div>{post.id}, {post.title}</div>
			}

			<h2>Комментарии</h2>
			{isComLoading
				? <Loader/>
				: <div>{comments.map((comment)=>
					<div style={{marginTop:'20px'}} key={comment.email}>
						<div>{comment.email}</div>
						<div>{comment.body}</div>
					</div>
				)}</div>
			}
		</div>
	);
};

export default PostIdPage;