const { verifyKey } = require('discord-interactions');

const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY || 'debcded15659157232a39d2869b2a5b2345d5d8e7c1fb7cca23842be689e9f30';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Signature-Ed25519, X-Signature-Timestamp');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  
  if (!signature || !timestamp) {
    return res.status(401).json({ error: 'Missing signature headers' });
  }

  const rawBody = JSON.stringify(req.body);
  
  const isValidRequest = verifyKey(rawBody, signature, timestamp, DISCORD_PUBLIC_KEY);
  
  if (!isValidRequest) {
    return res.status(401).json({ error: 'Bad request signature' });
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

    const content = responses[commandName] || '🎮 **Welcome to Nexus Nemesis!**\n\nPlay at:\nhttps://nexus-nemesis-grudgedev.replit.app';

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
}
