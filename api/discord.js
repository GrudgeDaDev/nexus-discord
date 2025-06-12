module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Signature-Ed25519, X-Signature-Timestamp');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'Discord Interactions Endpoint Active',
      status: 'ready',
      endpoint: '/api/discord'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const interaction = req.body;

  if (interaction.type === 1) {
    return res.json({ type: 1 });
  }

  if (interaction.type === 2) {
    const commandName = interaction.data?.name || 'unknown';
    
    const responses = {
      stats: '🎮 **Nexus Nemesis Player Stats**\n\nAccess your complete player statistics and game data.',
      cards: '🃏 **Nexus Nemesis Card Collection**\n\nView and manage your Season 0 cards in your collection.',
      battle: '⚔️ **Nexus Nemesis Battle Arena**\n\nEnter the battlefield and compete with other players.',
      packs: '📦 **Nexus Nemesis Card Packs**\n\nOpen card packs and expand your collection.',
      marketplace: '🏪 **Nexus Nemesis Marketplace**\n\nTrade cards with other players.',
      wallet: '💰 **Nexus Nemesis Wallet**\n\nCheck your GBUX balance and transaction history.'
    };

    const content = responses[commandName] || '🎮 **Welcome to Nexus Nemesis!**\n\nUse slash commands to interact with the game.';

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
      content: '🎮 Nexus Nemesis interaction processed successfully!',
      flags: 64
    }
  });
}
