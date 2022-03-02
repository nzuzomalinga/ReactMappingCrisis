import React from 'react'

export const TagsInput = (props:any) => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = (indexToRemove :any) => {
		setTags([...tags.filter(( _:any, index: any) => index !== indexToRemove)]);
	};
	const addTags = (event : any ) => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map(( tag:any , index:any ) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder="Press enter to add tags"
			/>
		</div>
	);
};
