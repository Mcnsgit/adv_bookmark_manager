import { useEffect, useState } from 'react';
import { bookmarkService } from '../../services/bookmarkService';
import BookmarkCard from './BookmarkCard';
import BookmarkForm from './BookmarkForm';

const BookmarkList = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const fetchBookmarks = async () => {
        try {
            setLoading(true);
            const response = await bookmarkService.getAllBookmarks();
            setBookmarks(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch bookmarks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBookmarks();
    }, []);
    const handleAddBookmark = async (bookmarkData) => {
        try {
            await bookmarkService.createBookmark(bookmarkData);
            fetchBookmarks();
            setShowForm(false);
        } catch (err) {
            setError('Failed to add bookmark');
            console.error(err);
        }
    };
    const handleDeleteBookmark = async (id) => {
        try {
            await bookmarkService.deleteBookmark(id);
            fetchBookmarks();
        } catch (err) {
            setError('Failed to delete bookmark');
            console.error(err);
        }
    };
    if (loading) {
        return <div className="text-center py-10">Loading bookmarks...</div>;
    }
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Bookmarks</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {showForm ? 'Cancel' : 'Add Bookmark'}
                </button>
            </div>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
            {showForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded">
                    <BookmarkForm onSubmit={handleAddBookmark} />
                </div>
            )}
            {bookmarks.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No bookmarks yet. Add your first bookmark!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookmarks.map((bookmark) => (
                        <BookmarkCard
                            key={bookmark._id}
                            bookmark={bookmark}
                            onEdit={() => console.log('Edit bookmark', bookmark)} // You can implement edit functionality later
                            onDelete={() => handleDeleteBookmark(bookmark._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default BookmarkList;