import React, { useState } from 'react';
import { Zap, TrendingUp, Users, DollarSign, Play, Download, Sparkles } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const VFormatCreativeEngine = () => {
  const [step, setStep] = useState(1);
  const [model, setModel] = useState('claude');
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
    setFormData(prev => ({
      ...prev,
      [field]: field === 'platforms'
        ? value.split(',').map(v => v.trim()) // convert back to array
        : value
    }));
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
      const response = model === 'claude'
        ? await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY
            },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 3000,
              messages: [{ role: 'user', content: prompt }]
            })
          })
        : await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            },
            body: JSON.stringify({
              model: 'gpt-4o',
              messages: [{ role: 'user', content: prompt }],
              max_tokens: 3000,
              temperature: 0.7
            })
          });

      const data = await response.json();
      const text = model === 'claude'
        ? data.content[0].text
        : data.choices[0].message.content;

      const brief = JSON.parse(text.replace(/```json\n?|```/g, '').trim());
      setGeneratedBrief(brief);
    } catch (error) {
      console.error(error);
      alert('Brief generation failed. Check your API keys or prompt.');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToPDF = () => {
    const content = document.querySelector('.space-y-8');
    html2pdf().from(content).save('Creative_Brief.pdf');
  };

  const renderStep1 = () => (
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

  const renderBriefOutput = () => (
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
        <select onChange={(e) => setModel(e.target.value)} value={model} className="border p-2 rounded">
          <option value="claude">Claude</option>
          <option value="gpt">GPT</option>
        </select>
      </div>
      {renderStep1()}
      {generatedBrief && renderBriefOutput()}
    </div>
  );
};

export default VFormatCreativeEngine;
