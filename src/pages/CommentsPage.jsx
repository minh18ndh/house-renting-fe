import { useEffect, useState } from 'react';
import { getAllComments, deleteComment } from '../apis/commentApi';
import { format } from 'date-fns';
import Button from '../components/Button';

const CommentsPage = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getAllComments();
                setComments(data);
            } catch (err) {
                console.error('Failed to fetch comments:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;
        try {
            await deleteComment(id);
            setComments(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error('Failed to delete comment:', err);
            alert('Delete failed. Try again.');
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4 text-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-text-main mb-6">Manage Comments</h1>

            {comments.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                    <div className="text-5xl mb-4">💬</div>
                    <p className="text-lg font-semibold text-text-main mb-2">No comments available</p>
                    <p className="text-text-muted">Users haven't left any reviews yet.</p>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase">User</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase">Property</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase">Rating</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase">Content</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase">Submitted</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {comments.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-text-main">{c.user?.fullName || 'Unknown'}</td>
                                    <td className="px-6 py-4 text-sm text-text-muted">{c.post.address}</td>
                                    <td className="px-6 py-4 text-sm text-yellow-500">
                                        {'★'.repeat(c.rating)}{'☆'.repeat(5 - c.rating)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-text-muted">{c.content}</td>
                                    <td className="px-6 py-4 text-sm text-text-muted">
                                        {c.submitDate ? format(new Date(c.submitDate), 'MMM d, yyyy') : '—'}
                                    </td>
                                    <td className="px-6 py-4 text-sm align-middle">
                                        <Button onClick={() => handleDelete(c.id)} variant="danger" className="text-red-600 hover:text-red-800">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CommentsPage;