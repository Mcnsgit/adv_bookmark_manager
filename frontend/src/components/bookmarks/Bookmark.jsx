import { memo } from 'react';
import PropTypes from 'prop-types';
const Bookmark = memo(({ 
    _id,
    url,
    title,
    description,
    in_reading_list,
    reading_priority 
}) => {
    return (
        <div className='bookmar-container'>
            <div className='bookmark-header'>
                <p>{_id}</p>
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                <h2>{title}</h2>
                <div className='bookmark-actions'>
                    <button className='bookmark-icon bookmark-icon--edit'>✏️</button>
                    <button className='bookmark-icon bookmark-icon--delete'>❌</button>
                    {in_reading_list && <span className='bookmark-icon bookmark-icon--reading-list'>📖</span>
                    }
                    {reading_priority > 0 && <span className='bookmark-icon bookmark-icon--priority'>{reading_priority}</span>
                    }
                </div>
            </div>
            <p>{description}</p>
        </div>
    );
});
Bookmark.displayName = 'Bookmark';
Bookmark.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    in_reading_list: PropTypes.bool,
    reading_priority: PropTypes.number,
};
Bookmark.defaultProps = {
    description: '',
    in_reading_list: false,
    reading_priority: 0,
};
export default Bookmark;