import React from 'react';
import classes from './MyButton.module.css';

// {props.children} - свойство, где храниться текст (ребенка)
// Можно делать деструктуризацию props
const MyButton = ({children, ...props}) => {
	return (
		// {...props} - здесь разворачиваем атрибуты, если нужны
		// {classes.myBtn} - еще способ обращения в стилям, в таком случае будет изоляция стилей для определенного модуля
		<button {...props} className={classes.myBtn}>
			{children}
		</button>
	);
};

export default MyButton;