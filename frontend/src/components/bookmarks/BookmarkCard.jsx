import PropTypes from 'prop-types';
import formatDate from '../../utils/formatters/formatDate';
import Bookmark from './Bookmark'; 

const BookmarkCard = ({ bookmark, onEdit, onDelete }) => {
    if (!bookmark) return null;
    return (
        <div className="border rounded p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start">
                {bookmark.favicon && (
                    <img 
                        src={bookmark.favicon} 
                        alt="" 
                        className="w-6 h-6 mr-2 mt-1"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                )}
                <div className="flex-grow">
                    {/* Use the Bookmark component to render bookmark details */}
                    <Bookmark 
                        _id={bookmark._id}
                        url={bookmark.url}
                        title={bookmark.title}
                        description={bookmark.description}
                        in_reading_list={bookmark.in_reading_list}
                        reading_priority={bookmark.reading_priority}
                    />
                    <div className="flex flex-wrap gap-1 mb-2">
                        {bookmark.tags && bookmark.tags.map(tag => (
                            <span 
                                key={tag} 
                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Added {formatDate(bookmark.created_at)}</span>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => onEdit(bookmark)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => onDelete(bookmark._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                {bookmark.in_reading_list && (
                    <div className="ml-2 flex flex-col items-center">
                        <span className="text-xs text-gray-500">Priority</span>
                        <span className={`
                            text-sm font-bold px-2 py-1 rounded-full
                            ${bookmark.reading_priority === 3 ? 'bg-red-100 text-red-700' : 
                              bookmark.reading_priority === 2 ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-green-100 text-green-700'}
                        `}>
                            {bookmark.reading_priority === 3 ? 'High' : 
                             bookmark.reading_priority === 2 ? 'Medium' : 'Low'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
BookmarkCard.propTypes = {
    bookmark: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        favicon: PropTypes.string,
        created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        tags: PropTypes.arrayOf(PropTypes.string),
        in_reading_list: PropTypes.bool,
        reading_priority: PropTypes.number,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default BookmarkCard;