import React, { useState } from 'react';
import { Zap, TrendingUp, Users, DollarSign, Play, Download, Sparkles } from 'lucide-react';

const VFormatCreativeEngine = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Trend Data
    streamingTrends: '',
    socialTrends: '',
    viralContent: '',
    genrePerformance: '',
    
    // Audience Targeting
    primaryDemo: '',
    ageRange: '',
    platforms: [],
    interests: '',
    
    // Production Parameters
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
      [field]: value
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

  const generateCreativeBrief = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock creative brief based on inputs
    const brief = {
      title: "MIRROR'S EDGE",
      logline: "A social media influencer discovers her perfect life is being live-streamed to dark web buyers.",
      genre: "Psychological Thriller + Social Media Drama",
      targetAudience: {
        primary: "Female 18-25, college-educated, high social media usage",
        platforms: {
          tiktok: "Mental health awareness, true crime, lifestyle content",
          instagram: "Influencer culture, aesthetic feeds, story engagement",
          youtube: "Creator economy, behind-the-scenes content, drama channels"
        }
      },
      seriesOverview: `Maya Chen built her dream life one post at a time - perfect apartment, perfect boyfriend, perfect brand deals. But when glitches in her smart home reveal hidden cameras, she realizes her curated reality is someone else's entertainment. Each 90-second episode peels back layers of digital deception as Maya discovers she's trapped in a high-tech reality show for wealthy voyeurs who bet on her life choices.`,
      characters: [
        {
          name: "Maya Chen",
          age: "22",
          archetype: "The Influencer Next Door",
          traits: "Relatable perfectionist, authentic but performing, tech-savvy but naive about privacy",
          casting: "Mixed Asian-American, warm but anxious energy, strong social media presence"
        },
        {
          name: "Derek 'TechBro' Williams", 
          age: "28",
          archetype: "The Helpful Stranger",
          traits: "Charming, mysteriously knowledgeable about her situation, unclear motives",
          casting: "Clean-cut tech worker aesthetic, trustworthy face with hidden intensity"
        },
        {
          name: "Riley Santos",
          age: "20", 
          archetype: "The Loyal Best Friend",
          traits: "Skeptical of social media, grounded, becomes Maya's reality anchor",
          casting: "Latina, natural beauty, strong comedic timing and dramatic range"
        }
      ],
      vformatStructure: {
        episodeLength: "60-90 seconds",
        totalEpisodes: "120 episodes",
        seasonBreaks: "Natural paywall points every 25 episodes",
        cliffhangerStrategy: "Each episode ends mid-revelation or with new surveillance discovery"
      },
      episodeBreakdown: [
        {
          episode: 1,
          summary: "HOOK: 'My perfect life just got 50,000 new viewers.' Maya's Ring doorbell shows strangers watching her morning routine. REVEAL: Camera count increases in real-time.",
          cliffhanger: "Maya finds a hidden camera in her coffee maker."
        },
        {
          episode: 2, 
          summary: "Maya confronts her landlord about security cameras. TWIST: He has no idea what she's talking about. REVEAL: Her apartment's smart devices are all compromised.",
          cliffhanger: "Her phone shows a message: 'Smile, Maya. The show must go on.'"
        },
        {
          episode: 3,
          summary: "Maya tries to leave her apartment but the smart lock won't open. FLASH: Montage of all her 'candid' moments being broadcast. DIALOGUE: 'You agreed to this, Maya.'",
          cliffhanger: "A package arrives with Maya's own voice saying 'Open me.'"
        }
      ],
      visualStyle: {
        cinematography: "Vertical-first framing, security camera POV shots, phone screen integration, mirror reflections",
        colorPalette: "Instagram-warm tones shifting to surveillance-cool blues and greens",
        locations: "Single apartment location with smart home tech, occasional phone/video call locations",
        design: "Influencer aesthetic meets Black Mirror - beautiful spaces with hidden menace"
      },
      marketingStrategy: {
        brandCollabs: [
          "Ring/Nest (organic integration of smart home paranoia)",
          "Glossier/Fenty (Maya's beauty routine as performance)",
          "Urban Outfitters (apartment aesthetic that feels watched)"
        ],
        adTargeting: {
          primary: "Lookalike audiences based on Black Mirror viewers, true crime podcast listeners, influencer followers",
          retargeting: "Users who engage with privacy/surveillance content, smart home ads, influencer drama"
        },
        viralMoments: [
          "Episode 7: Maya's Ring doorbell livestreams her breakdown",
          "Episode 15: Viewers vote on Maya's outfit via her smart mirror",
          "Episode 30: Maya discovers her subscribers are bidding on her decisions"
        ]
      },
      budget: {
        aboveTheLine: "$45,000 (cast, writer, director)",
        belowTheLine: "$85,000 (crew, equipment, smart home tech props)",
        postProduction: "$35,000 (editing, sound, graphics, vertical optimization)",
        marketing: "$35,000 (platform seeding, influencer partnerships)",
        total: "$200,000"
      },
      successMetrics: {
        completionRate: "75% episode-to-episode retention target", 
        unlockRate: "8-12% paywall conversion at season breaks",
        viralPotential: "Mirror/smart home revelation moments optimized for screenshot sharing",
        ipValue: "Expandable to traditional format, merchandise potential, interactive app"
      }
    };
    
    setGeneratedBrief(brief);
    setIsGenerating(false);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Trend Analysis Input</h2>
        </div>
        <p className="text-gray-600">Enter current trending content data to fuel AI-powered creative generation</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Streaming Platform Trends
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="4"
            placeholder="Top Netflix shows this month, Korean content surge, dark academia themes..."
            value={formData.streamingTrends}
            onChange={(e) => handleInputChange('streamingTrends', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Media Trends
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="4"
            placeholder="Viral TikTok trends, trending hashtags, Reddit discussions, Twitter topics..."
            value={formData.socialTrends}
            onChange={(e) => handleInputChange('socialTrends', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Viral Content Examples
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="4"
            placeholder="Specific viral videos, memes, or content pieces driving engagement..."
            value={formData.viralContent}
            onChange={(e) => handleInputChange('viralContent', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre Performance Data
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="4"
            placeholder="Romance up 40%, thrillers performing well, comedy engagement down..."
            value={formData.genrePerformance}
            onChange={(e) => handleInputChange('genrePerformance', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setStep(2)}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Next: Audience Targeting
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Audience Targeting</h2>
        </div>
        <p className="text-gray-600">Define your target demographic and platform preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Demographics
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Female 18-25, college-educated, urban..."
            value={formData.primaryDemo}
            onChange={(e) => handleInputChange('primaryDemo', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Range
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.ageRange}
            onChange={(e) => handleInputChange('ageRange', e.target.value)}
          >
            <option value="">Select age range</option>
            <option value="13-17">Gen Z (13-17)</option>
            <option value="18-25">Gen Z Adults (18-25)</option>
            <option value="26-35">Millennials (26-35)</option>
            <option value="36-45">Gen X (36-45)</option>
            <option value="mixed">Mixed Demographics</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Primary Platforms
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['TikTok', 'Instagram', 'YouTube', 'Snapchat', 'Twitter', 'ReelShort', 'Douyin', 'Custom App'].map(platform => (
              <button
                key={platform}
                onClick={() => handlePlatformToggle(platform)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  formData.platforms.includes(platform)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Audience Interests & Behaviors
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Mental health awareness, true crime, lifestyle content, fashion, gaming..."
            value={formData.interests}
            onChange={(e) => handleInputChange('interests', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Next: Production Parameters
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <DollarSign className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Production Parameters</h2>
        </div>
        <p className="text-gray-600">Set your budget, timeline, and production constraints</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
          >
            <option value="">Select budget range</option>
            <option value="50k">$50,000 - $100,000</option>
            <option value="100k">$100,000 - $200,000</option>
            <option value="200k">$200,000 - $300,000</option>
            <option value="300k">$300,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Production Timeline
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={formData.timeline}
            onChange={(e) => handleInputChange('timeline', e.target.value)}
          >
            <option value="">Select timeline</option>
            <option value="4weeks">4 weeks</option>
            <option value="6weeks">6 weeks</option>
            <option value="8weeks">8 weeks</option>
            <option value="12weeks">12+ weeks</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location Constraints
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          >
            <option value="">Select location type</option>
            <option value="single">Single location preferred</option>
            <option value="2-3">2-3 locations max</option>
            <option value="multiple">Multiple locations OK</option>
            <option value="studio">Studio/controlled environment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cast Size
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={formData.castSize}
            onChange={(e) => handleInputChange('castSize', e.target.value)}
          >
            <option value="">Select cast size</option>
            <option value="2">2 main characters</option>
            <option value="3-4">3-4 main characters</option>
            <option value="5-6">5-6 main characters</option>
            <option value="ensemble">Larger ensemble</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Back
        </button>
        <button
          onClick={generateCreativeBrief}
          disabled={isGenerating}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="animate-spin h-5 w-5 mr-2" />
              Generating Brief...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5 mr-2" />
              Generate Creative Brief
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderGeneratedBrief = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Play className="h-8 w-8 text-indigo-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">{generatedBrief.title}</h2>
        </div>
        <p className="text-xl text-gray-600 italic">{generatedBrief.logline}</p>
        <div className="mt-4 flex justify-center space-x-4">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            {generatedBrief.genre}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {generatedBrief.budget.total} Budget
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Target Audience */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Target Audience</h3>
          <p className="text-blue-800 mb-4">{generatedBrief.targetAudience.primary}</p>
          <div className="space-y-2">
            <div><strong>TikTok:</strong> {generatedBrief.targetAudience.platforms.tiktok}</div>
            <div><strong>Instagram:</strong> {generatedBrief.targetAudience.platforms.instagram}</div>
            <div><strong>YouTube:</strong> {generatedBrief.targetAudience.platforms.youtube}</div>
          </div>
        </div>

        {/* V-Format Structure */}
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">V-Format™ Structure</h3>
          <div className="space-y-2 text-purple-800">
            <div><strong>Episode Length:</strong> {generatedBrief.vformatStructure.episodeLength}</div>
            <div><strong>Total Episodes:</strong> {generatedBrief.vformatStructure.totalEpisodes}</div>
            <div><strong>Season Breaks:</strong> {generatedBrief.vformatStructure.seasonBreaks}</div>
            <div><strong>Cliffhanger Strategy:</strong> {generatedBrief.vformatStructure.cliffhangerStrategy}</div>
          </div>
        </div>
      </div>

      {/* Series Overview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Series Overview</h3>
        <p className="text-gray-700 leading-relaxed">{generatedBrief.seriesOverview}</p>
      </div>

      {/* Main Characters */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Characters</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {generatedBrief.characters.map((character, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">{character.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{character.age} • {character.archetype}</p>
              <p className="text-sm text-gray-700 mb-2">{character.traits}</p>
              <p className="text-xs text-gray-600"><strong>Casting:</strong> {character.casting}</p>
            </div>
          ))}
        </div>
      </div>

      {/* First Episodes Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">First Episodes Breakdown</h3>
        <div className="space-y-4">
          {generatedBrief.episodeBreakdown.map((ep, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Episode {ep.episode}</h4>
              <p className="text-gray-700 mb-2">{ep.summary}</p>
              <p className="text-sm text-red-600"><strong>Cliffhanger:</strong> {ep.cliffhanger}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4">Production Budget</h3>
        <div className="grid md:grid-cols-2 gap-4 text-green-800">
          <div><strong>Above-the-Line:</strong> {generatedBrief.budget.aboveTheLine}</div>
          <div><strong>Below-the-Line:</strong> {generatedBrief.budget.belowTheLine}</div>
          <div><strong>Post-Production:</strong> {generatedBrief.budget.postProduction}</div>
          <div><strong>Marketing:</strong> {generatedBrief.budget.marketing}</div>
        </div>
        <div className="mt-4 pt-4 border-t border-green-200">
          <div className="text-xl font-bold text-green-900">Total: {generatedBrief.budget.total}</div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">Success Metrics</h3>
        <div className="space-y-2 text-yellow-800">
          <div><strong>Completion Rate:</strong> {generatedBrief.successMetrics.completionRate}</div>
          <div><strong>Unlock Rate:</strong> {generatedBrief.successMetrics.unlockRate}</div>
          <div><strong>Viral Potential:</strong> {generatedBrief.successMetrics.viralPotential}</div>
          <div><strong>IP Value:</strong> {generatedBrief.successMetrics.ipValue}</div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => {
            setGeneratedBrief(null);
            setStep(1);
          }}
          className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Generate New Brief
        </button>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Export Brief
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg mr-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              V-Format™ Creative Engine
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform trending content signals into data-backed creative briefs for vertical storytelling
          </p>
        </div>

        {/* Progress Indicator */}
        {!generatedBrief && (
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    step >= stepNum 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step > stepNum ? 'bg-purple-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {!generatedBrief && step === 1 && renderStep1()}
          {!generatedBrief && step === 2 && renderStep2()}
          {!generatedBrief && step === 3 && renderStep3()}
          {generatedBrief && renderGeneratedBrief()}
        </div>

        {/* Loading State */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
              <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Trends...</h3>
              <p className="text-gray-600 mb-4">AI is processing your inputs and generating a comprehensive creative brief</p>
              <div className="space-y-2 text-left text-sm text-gray-500">
                <div>✓ Processing streaming platform data</div>
                <div>✓ Analyzing social media trends</div>
                <div>✓ Mapping audience psychographics</div>
                <div>✓ Generating story concepts</div>
                <div className="animate-pulse">⚡ Optimizing for V-Format™ structure</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VFormatCreativeEngine;