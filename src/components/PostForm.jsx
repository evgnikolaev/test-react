import React, {useState, useRef} from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
	const [post, setPost] = useState({title: '', body: ''});

	//С помомощью useRef() - можем получить доступ к дом-элементу (как bodyInputRef.current)
	const bodyInputRef = useRef();

	const addNewPost = (e) => {
		e.preventDefault();
		// console.log(bodyInputRef.current);
		const newPost = {
			...post, id: Date.now()
		};
		create(newPost);
		setPost({title: '', body: ''});
	};


	return (
		<form>
			{/* Управляемый компонент, когда делаем двустороннее связывание */}
			<div>
				<MyInput type="text" placeholder="Название поста"
						 value={post.title}
						 onChange={e => setPost({
							 ...post,
							 title: e.target.value
						 })}/>
			</div>
			<div>
				<MyInput type="text" placeholder="Название поста"
						 value={post.body}
						 onChange={e => setPost({
							 ...post,
							 body: e.target.value
						 })}/>

			</div>

			{/* Неуправляемый компонент , доступ как к дом элементу, не рекомендуется, но в редких случаях нужен */}
			<div>
				{/*<MyInput type="text" placeholder="Описание поста" ref={bodyInputRef}/>*/}
			</div>

			<MyButton onClick={addNewPost}>Создать пост</MyButton>
		</form>
	);
};

export default PostForm;