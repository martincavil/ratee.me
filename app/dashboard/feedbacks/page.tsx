import { getFeedbacks } from '@/lib/supabase/queries';
import { formatDate, getNPSCategory } from '@/lib/utils';

export default async function FeedbacksPage() {
  const { feedbacks, stats } = await getFeedbacks({ limit: 100 }).catch(() => ({
    feedbacks: [],
    stats: {
      avg_nps: 0,
      total_feedbacks: 0,
      nps_distribution: { detractors: 0, passives: 0, promoters: 0 },
    },
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Client Feedbacks</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Average NPS</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.avg_nps.toFixed(1)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Promoters (9-10)</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.nps_distribution.promoters}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Passives (7-8)</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {stats.nps_distribution.passives}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Detractors (0-6)</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {stats.nps_distribution.detractors}
          </p>
        </div>
      </div>

      {/* Feedbacks List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">All Feedbacks</h2>
        </div>

        {feedbacks.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No feedbacks yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Feedbacks will appear here once clients respond
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {feedbacks.map((feedback) => {
              const category = getNPSCategory(feedback.nps_score);
              return (
                <div key={feedback.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {feedback.client_name}
                        </h3>
                        <span
                          className={`px-3 py-1 text-sm font-bold rounded-full ${
                            category === 'promoter'
                              ? 'bg-green-100 text-green-800'
                              : category === 'passive'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {feedback.nps_score}/10
                        </span>
                      </div>

                      {feedback.comment && (
                        <p className="text-gray-700 mb-2 italic">
                          &quot;{feedback.comment}&quot;
                        </p>
                      )}

                      <p className="text-sm text-gray-500">
                        {formatDate(feedback.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
