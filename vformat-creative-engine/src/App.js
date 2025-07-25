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

  const buildPrompt = (formData) => {
    const lines = [
      "You are the V-Format™ Creative Engine. Use the data below to reverse-engineer a vertical storytelling hit. Only use the information provided — do not assume missing fields.",
      "",
      "Respond ONLY with a structured JSON object with the following sections:",
      "1. OVERVIEW",
      "2. STORYLINE",
      "3. SERIES MAP",
      "4. PERFORMANCE ARCHETYPES",
      "5. TARGETING STRATEGY",
      "6. MONETIZATION",
      "7. MARKETING",
      "8. PRODUCTION",
      "9. IP SCORECARD",
      "",
      "INPUTS:"
    ];

    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.length > 0) {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        const content = Array.isArray(value) ? value.join(', ') : value;
        lines.push(`- ${label}: ${content}`);
      }
    });

    return lines.join('\n');
  };

  const generateCreativeBrief = async () => {
    if (Object.values(formData).every(val => !val || val.length === 0)) {
      alert("Please fill in at least one field to generate a brief.");
      return;
    }

    setIsGenerating(true);
    const prompt = buildPrompt(formData);

    try {
      const claudeRes = await fetch('/.netlify/functions/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const claudeJson = await claudeRes.json();

      let structured;
      if (claudeJson?.response && typeof claudeJson.response === 'string') {
        const cleaned = claudeJson.response.replace(/```json\n?|```/g, '').trim();
        structured = JSON.parse(cleaned);
      } else {
        console.error("Claude response invalid or undefined:", claudeJson);
        alert("Claude did not return usable content.");
        return;
      }

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

  const fieldPlaceholders = {
    streamingTrends: "e.g. Genre surges on Netflix, binge behavior",
    socialTrends: "e.g. TikTok trends like girl dinner, NPC lives",
    viralContent: "e.g. Skits, storytimes, surprise endings",
    genrePerformance: "e.g. Horror and romance outperform on Reels",
    primaryDemo: "e.g. Gen Z women, urban millennials",
    ageRange: "e.g. 18–25",
    platforms: "e.g. TikTok, YouTube Shorts, IG Reels",
    interests: "e.g. fashion, relationships, astrology",
    budget: "e.g. $5–10k per episode",
    timeline: "e.g. 8-week production window",
    location: "e.g. apartment interiors, city streets",
    castSize: "e.g. 2–3 core characters"
  };

  const isFormEmpty = Object.values(formData).every(val => !val || val.length === 0);

  const renderForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.keys(formData).map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-sm font-semibold mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
          <input
            type="text"
            placeholder={fieldPlaceholders[field] || ''}
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      ))}
      <button
        onClick={generateCreativeBrief}
        disabled={isGenerating || isFormEmpty}
        className={`col-span-full py-2 px-4 rounded mt-4 text-white ${
          isGenerating || isFormEmpty ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
        }`}
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
