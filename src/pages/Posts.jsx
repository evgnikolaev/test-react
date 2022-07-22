import React, {useState, useRef, useMemo, useEffect} from "react";
import '../styles/App.css'

import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import {usePosts} from "../hooks/usePost";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/loader";
import {useFetching} from '../hooks/useFetching';
import {getPageCount, getPagesArray} from '../utils/pages';
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);

	const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query);

	const lastElement = useRef();

	const changePage = (page) => {
		setPage(page);
	};

	const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts([...posts, ...response.data]);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	});

	useObserver(lastElement, page < totalPages, isPostLoading, () => {
		setPage(page + 1);
	});


	useEffect(() => {
		fetchPosts(limit, page)
	}, [page, limit]);

	/*
	Постраничная

	const changePage = (page) => {
		setPage(page);
		fetchPosts(limit, page)
	};

	const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	});

	useEffect(() => {
		fetchPosts(limit, page)
	}, []);
	*/


	/*
	Жизненные циклы компонента:
	- Монтирование (mount) , когда в useEffect() передали пустой массив
	- Обновление (update) (перерендер), когда в useEffect() передали данные
	- Размонтирование (unmount), когда из useEffect() возвращаем ф-ию
	*/

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false)
	};

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	};


	return (
		<div className="App">
			<MyButton onClick={e => setModal(true)}>Создать пользователя</MyButton>
			<MyModal visible={modal} setVisible={setModal}><PostForm create={createPost}/></MyModal>

			<hr style={{margin: '15px 0'}}/>

			<PostFilter filter={filter} setFilter={setFilter}/>

			<MySelect value={limit} onChange={value => setLimit(value)} defaultValue="Кол-во элементов" options={[
				{value: 5, name: '5'},
				{value: 10, name: '10'},
				{value: 15, name: '15'},
				{value: -1, name: 'Все'},
			]}/>
			<hr style={{margin: '15px 0'}}/>
			{postError && <h1>Произошла ошибка ${postError}</h1>}

			{isPostLoading && <Loader/>}
			<PostList posts={sortedAndSearchedPost} remove={removePost} title="Список Постов"/>
			<div ref={lastElement} style={{height: '20px', background: 'red'}}></div>

			{/*{isPostLoading*/} {/*	? <Loader/>*/} {/*	: <PostList posts={sortedAndSearchedPost} remove={removePost} title="Список Постов"/>*/} {/*}*/}
			<Pagination page={page} changePage={changePage} totalPages={totalPages}/>
		</div>
	);
}

export default Posts;
