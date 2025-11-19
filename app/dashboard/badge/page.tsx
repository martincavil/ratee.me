'use client';

import { useState, useEffect } from 'react';

export default function BadgePage() {
  const [stats, setStats] = useState({
    avg_nps: 0,
    total_feedbacks: 0,
    total_promoters: 0,
    total_passives: 0,
    total_detractors: 0,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/badge/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const embedCode = `<div style="font-family: Arial, sans-serif; border: 2px solid #0052FF; border-radius: 8px; padding: 16px; max-width: 300px; text-align: center;">
  <div style="font-size: 14px; color: #666; margin-bottom: 8px;">Client Satisfaction</div>
  <div style="font-size: 48px; font-weight: bold; color: #0052FF;">${stats.avg_nps.toFixed(1)}</div>
  <div style="font-size: 12px; color: #999; margin-bottom: 16px;">Average NPS Score</div>
  <div style="font-size: 12px; color: #666;">${stats.total_feedbacks} total feedbacks</div>
  <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee; font-size: 10px; color: #999;">
    Powered by ratee.me
  </div>
</div>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">NPS Badge</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Badge Preview</h2>
          <p className="text-gray-600 mb-6">
            This is how your NPS badge will appear on your website
          </p>

          <div className="flex justify-center">
            <div
              style={{
                fontFamily: 'Arial, sans-serif',
                border: '2px solid #0052FF',
                borderRadius: '8px',
                padding: '16px',
                maxWidth: '300px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                Client Satisfaction
              </div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#0052FF' }}>
                {stats.avg_nps.toFixed(1)}
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '16px' }}>
                Average NPS Score
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {stats.total_feedbacks} total feedbacks
              </div>
              <div
                style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #eee',
                  fontSize: '10px',
                  color: '#999',
                }}
              >
                Powered by ratee.me
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> The badge updates automatically when you receive new
              feedbacks!
            </p>
          </div>
        </div>

        {/* Embed Code */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Embed Code</h2>
          <p className="text-gray-600 mb-6">
            Copy this code and paste it anywhere on your website
          </p>

          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-xs">
              {embedCode}
            </pre>
            <button
              onClick={copyCode}
              className="absolute top-2 right-2 px-3 py-1 bg-white text-gray-900 rounded text-sm font-medium hover:bg-gray-100"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How to use:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Copy the embed code above</li>
                <li>Open your website's HTML file</li>
                <li>Paste the code where you want the badge to appear</li>
                <li>Save and refresh your website</li>
              </ol>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                <strong>Pro tip:</strong> Place your badge on your homepage, about page,
                or portfolio to build trust with potential clients!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Breakdown */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-md">
            <p className="text-2xl font-bold text-gray-900">{stats.avg_nps.toFixed(1)}</p>
            <p className="text-sm text-gray-600">Average NPS</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-md">
            <p className="text-2xl font-bold text-green-600">{stats.total_promoters}</p>
            <p className="text-sm text-gray-600">Promoters</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-md">
            <p className="text-2xl font-bold text-yellow-600">{stats.total_passives}</p>
            <p className="text-sm text-gray-600">Passives</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-md">
            <p className="text-2xl font-bold text-red-600">{stats.total_detractors}</p>
            <p className="text-sm text-gray-600">Detractors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
