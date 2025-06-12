module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Signature-Ed25519, X-Signature-Timestamp');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'Discord Endpoint Ready',
      status: 'active',
      bot: 'Grudge Warlord #0924'
    });
  }

  if (req.method === 'POST') {
    const interaction = req.body;

    if (interaction.type === 1) {
      return res.json({ type: 1 });
    }

    if (interaction.type === 2) {
      const commandName = interaction.data?.name || 'stats';
      
      return res.json({
        type: 4,
        data: {
          content: `🎮 **Nexus Nemesis ${commandName.toUpperCase()}**\n\nCommand processed successfully for Grudge Warlord bot!`,
          flags: 64
        }
      });
    }

    return res.json({
      type: 4,
      data: {
        content: '🎮 Nexus Nemesis - Discord interaction received!',
        flags: 64
      }
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
