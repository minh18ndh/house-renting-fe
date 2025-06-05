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
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-text-main mb-6">Manage Comments</h1>

      {comments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="text-5xl mb-4">💬</div>
          <p className="text-lg font-semibold text-text-main mb-2">No comments available</p>
          <p className="text-text-muted">Users haven't left any reviews yet.</p>
        </div>
      ) : (
        <>
          {/* Card View*/}
          <div className="lg:hidden space-y-6">
            {comments.map((c) => (
              <div key={c.id} className="bg-white p-4 rounded-lg shadow-md space-y-2">
                <p className="text-sm text-text-muted">User: <span className="text-text-main font-medium">{c.user?.fullName || 'Unknown'}</span></p>
                <p className="text-sm text-text-muted">Property: <span className="text-text-main">{c.post?.address || '—'}</span></p>
                <p className="text-sm text-yellow-500">
                  Rating: {'★'.repeat(c.rating)}{'☆'.repeat(5 - c.rating)}
                </p>
                <p className="text-sm text-text-muted whitespace-pre-line break-words">
                  {c.content}
                </p>
                <p className="text-xs text-text-muted">
                  {c.submitDate ? format(new Date(c.submitDate), 'PPPpp') : '—'}
                </p>
                <Button
                  onClick={() => handleDelete(c.id)}
                  variant="danger"
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>

          {/* Table View */}
          <div className="hidden lg:block bg-white shadow-md rounded-lg overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-gray-50 text-xs uppercase text-text-muted tracking-wide">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">User</th>
                  <th className="px-6 py-4 text-left font-semibold">Property</th>
                  <th className="px-6 py-4 text-left font-semibold">Rating</th>
                  <th className="px-6 py-4 text-left font-semibold">Content</th>
                  <th className="px-6 py-4 text-left font-semibold">Submitted</th>
                  <th className="px-6 py-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comments.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 align-top">
                    <td className="px-6 py-6 text-sm font-medium text-text-main whitespace-nowrap">{c.user?.fullName || 'Unknown'}</td>
                    <td className="px-6 py-6 text-sm text-text-muted whitespace-nowrap">{c.post?.address || '—'}</td>
                    <td className="px-6 py-6 text-sm text-yellow-500 whitespace-nowrap">
                      {'★'.repeat(c.rating)}{'☆'.repeat(5 - c.rating)}
                    </td>
                    <td className="px-6 py-6 text-sm text-text-muted break-words max-w-xl whitespace-pre-line">{c.content}</td>
                    <td className="px-6 py-6 text-sm text-text-muted whitespace-nowrap">
                      {c.submitDate ? format(new Date(c.submitDate), 'PPPpp') : '—'}
                    </td>
                    <td className="px-6 py-6 text-sm">
                      <Button
                        onClick={() => handleDelete(c.id)}
                        variant="danger"
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentsPage;