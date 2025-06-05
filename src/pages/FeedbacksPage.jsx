import { useEffect, useState } from 'react';
import { getAllFeedbacks } from '../apis/feedbackApi';
import { format } from 'date-fns';

const FeedbacksPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const data = await getAllFeedbacks();
                setFeedbacks(data);
            } catch (err) {
                console.error('Failed to fetch feedbacks:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto p-4 text-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-text-main mb-6">User Feedbacks</h1>

            {feedbacks.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                    <div className="text-5xl mb-4">📝</div>
                    <p className="text-lg font-semibold text-text-main mb-2">No feedback yet</p>
                    <p className="text-text-muted">No users have submitted feedback so far.</p>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase">Submitted At</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase">Content</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {feedbacks.map((fb) => (
                                <tr key={fb.id} className="hover:bg-gray-50 align-top">
                                    <td className="px-6 py-6 text-sm text-text-muted whitespace-nowrap">
                                        {fb.submitDate ? format(new Date(fb.submitDate), 'PPPpp') : '—'}
                                    </td>
                                    <td className="px-6 py-6 text-sm text-text-main whitespace-pre-line break-words max-w-4xl">
                                        {fb.content}
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

export default FeedbacksPage;