import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {


	// не понял
	// function getSortedPosts(){
	// 	console.log('getSortedPosts');
	//
	// 	if (selectedSort) {
	// 		return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
	// 	} else {
	// 		return posts;
	// 	}
	//
	// }
	// const sortedPosts = getSortedPosts();


	return (
		<div>
			<MyInput placehoder="Поиск" value={filter.query} onChange={e => setFilter({
				...filter,
				query: e.target.value
			})}/>

			<MySelect defaultValue="Сортировка" value={filter.sort} onChange={selectedSort => setFilter({
				...filter,
				sort: selectedSort
			})} options={[
				{value: 'title', name: 'по названию'},
				{value: 'body', name: 'по описанию'}
			]}/>
		</div>
	);
};

export default PostFilter;