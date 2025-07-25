import React, { useState } from 'react';
import { Loader2, Zap, Sparkles } from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({
    trendData: '',
    targetAudience: '',
    productionConstraints: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [creativeBrief, setCreativeBrief] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateBrief = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/.netlify/functions/generateBrief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setCreativeBrief(data.brief);
    } catch (error) {
      console.error('Brief generation failed:', error);
      alert('Something went wrong. Try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Sparkles className="text-purple-600" /> V-Format™ Creative Engine
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold">1. Trend Data</label>
          <textarea
            name="trendData"
            value={formData.trendData}
            onChange={handleChange}
            rows="4"
            placeholder="e.g., Dark academia, secret societies, K-thrillers, TikTok hashtag trends..."
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">2. Target Audience</label>
          <textarea
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Women 18–25, TikTok-first, loves suspense and romance..."
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">3. Production Constraints</label>
          <textarea
            name="productionConstraints"
            value={formData.productionConstraints}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., $200K budget, 8-week timeline, 4-character cast, single-location..."
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={generateBrief}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition"
        >
          {isGenerating ? <Loader2 className="animate-spin" /> : <Zap />}
          {isGenerating ? 'Generating...' : 'Generate Creative Brief'}
        </button>
      </div>

      {creativeBrief && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">🎬 Your Creative Brief</h2>
          <pre className="bg-gray-100 p-4 whitespace-pre-wrap rounded-md text-sm overflow-x-auto">
            {creativeBrief}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
