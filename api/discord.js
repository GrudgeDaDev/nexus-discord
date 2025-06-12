export default async function handler(req, res) {
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
      commands: 8
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
        play: '🎮 **Starting Nexus Nemesis Game Session**',
        view: '👁️ **Viewing Card Collection**',
        challenge: '⚔️ **Battle Arena Challenge**',
        auction: '🏪 **Marketplace Access**',
        rank: '🏆 **Player Rankings**',
        bid: '💰 **Auction Bidding**',
        info: 'ℹ️ **Nexus Nemesis - Web3 Trading Card Game**',
        launch: '🚀 **Discord Activity Launch**'
      };

      const content = responses[commandName] || '🎮 **Grudge Warlord Bot Active**';

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
    return res.status(500).json({ error: 'Internal server error' });
  }
}
