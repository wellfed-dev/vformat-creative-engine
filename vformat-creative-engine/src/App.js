import React, { useState } from 'react';
import { Zap, TrendingUp, Users, DollarSign, Play, Download, Sparkles } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const VFormatCreativeEngine = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    streamingTrends: '',
    socialTrends: '',
    viralContent: '',
    genrePerformance: '',
    primaryDemo: '',
    ageRange: '',
    platforms: [],
    interests: '',
    budget: '',
    timeline: '',
    location: '',
    castSize: ''
  });
  const [generatedBrief, setGeneratedBrief] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlatformToggle = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const buildPrompt = (formData) => `You are the V-Format™ Creative Engine. Use the data below to reverse-engineer a vertical storytelling hit. Create a creative brief structured into the following sections, with clear rationale and insight-backed decisions:

1. OVERVIEW: Logline, genre, tone, hook
2. STORYLINE: Narrative world, conflict, emotional driver
3. SERIES MAP: 10-episode arc, cliffhanger strategy, IP expansion path
4. PERFORMANCE ARCHETYPES: Story mechanics and character arcs based on trending content
5. TARGETING STRATEGY: Affinity demos, platform behavior, competitive whitespace
6. MONETIZATION: Unlock points, merch potential, brand collab opportunities
7. MARKETING: Viral triggers, shareable moments, audio/visual cues
8. PRODUCTION: Timeline, cast, setting, budget tiering
9. IP SCORECARD: Completion rate forecast, unlock rate, merchability, brand alignment, and greenlight rating

TREND INPUTS:
- Streaming Trends: ${formData.streamingTrends || 'Not specified'}
- Social Trends: ${formData.socialTrends || 'Not specified'}
- Viral Content: ${formData.viralContent || 'Not specified'}
- Genre Performance: ${formData.genrePerformance || 'Not specified'}

TARGET AUDIENCE:
- Demographic: ${formData.primaryDemo || 'Not specified'}
- Age Range: ${formData.ageRange || 'Not specified'}
- Platforms: ${formData.platforms.join(', ') || 'Not specified'}
- Interests: ${formData.interests || 'Not specified'}

PRODUCTION:
- Budget: ${formData.budget || 'Not specified'}
- Timeline: ${formData.timeline || 'Not specified'}
- Location: ${formData.location || 'Not specified'}
- Cast Size: ${formData.castSize || 'Not specified'}

Respond ONLY with a structured JSON object with these sections.`;

const generateCreativeBrief = async () => {
  setIsGenerating(true);
  const prompt = buildPrompt(formData);

  try {
    // Step 1: Claude (structure generation)
    const claudeRes = await fetch('/.netlify/functions/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const claudeJson = await claudeRes.json(); // <-- ✅ This was missing

    let structured;
    if (claudeJson?.response && typeof claudeJson.response === 'string') {
      const cleaned = claudeJson.response.replace(/```json\n?|```/g, '').trim();
      structured = JSON.parse(cleaned);
    } else {
      console.error("Claude response invalid or undefined:", claudeJson);
      return;
    }

    // Step 2: GPT (creative generation)
    const gptRes = await fetch('/.netlify/functions/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ structured })
    });

    const gptJson = await gptRes.json();
    const creativeBrief = JSON.parse(gptJson.response.replace(/```json\n?|```/g, '').trim());

    setGeneratedBrief(creativeBrief);
  } catch (err) {
    console.error(err);
    alert("Something went wrong generating your brief.");
  } finally {
    setIsGenerating(false);
  }
};


  const exportToPDF = () => {
    const content = document.querySelector('.space-y-8');
    html2pdf().from(content).save('Creative_Brief.pdf');
  };

  const renderForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.keys(formData).map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-sm font-semibold mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
          <input
            type="text"
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      ))}
      <button
        onClick={generateCreativeBrief}
        disabled={isGenerating}
        className="col-span-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 mt-4"
      >
        {isGenerating ? 'Generating...' : 'Generate Creative Brief'}
      </button>
    </div>
  );

  const renderOutput = () => (
    <div className="bg-white p-4 border rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">Generated Brief</h2>
      {generatedBrief && Object.entries(generatedBrief).map(([section, content]) => (
        <div key={section}>
          <h3 className="text-lg font-semibold uppercase">{section}</h3>
          <pre className="whitespace-pre-wrap text-sm mt-1">{JSON.stringify(content, null, 2)}</pre>
        </div>
      ))}
      <button onClick={exportToPDF} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Export to PDF</button>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">V-Format™ Creative Engine</h1>
      </div>
      {renderForm()}
      {generatedBrief && renderOutput()}
    </div>
  );
};

export default VFormatCreativeEngine;
