module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Signature-Ed25519, X-Signature-Timestamp');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'Grudge Warlord Discord Bot Active',
      status: 'ready',
      bot: 'Grudge Warlord #0924',
      commands: 8,
      endpoint: '/api/discord'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const interaction = req.body;

    if (interaction.type === 1) {
      return res.json({ type: 1 });
    }

    if (interaction.type === 2) {
      const commandName = interaction.data?.name || 'unknown';
      
      const responses = {
        play: '🎮 **Starting Nexus Nemesis Game Session**\n\nInitializing your game environment with Season 0 cards.',
        view: '👁️ **Viewing Card Collection**\n\nDisplaying your complete Season 0 card inventory.',
        challenge: '⚔️ **Battle Arena Challenge**\n\nPreparing 20-card deck for competitive battle.',
        auction: '🏪 **Marketplace Access**\n\nOpening SOL-based card trading marketplace.',
        rank: '🏆 **Player Rankings**\n\nDisplaying current leaderboards and statistics.',
        bid: '💰 **Auction Bidding**\n\nAccessing live card auction system.',
        info: 'ℹ️ **Nexus Nemesis Information**\n\nWeb3 Trading Card Game by Grudge Studio with 100 Season 0 cards.',
        launch: '🚀 **Discord Activity Launch**\n\nStarting embedded game experience.'
      };

      const content = responses[commandName] || '🎮 **Grudge Warlord Bot Active**\n\nUse /play, /view, /challenge, /auction, /rank, /bid, /info, or /launch commands.';

      return res.json({
        type: 4,
        data: {
          content,
          flags: 64
        }
      });
    }

    return res.json({
      type: 4,
      data: {
        content: '🎮 Nexus Nemesis interaction processed!',
        flags: 64
      }
    });
  } catch (error) {
    console.error('Discord interaction error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
