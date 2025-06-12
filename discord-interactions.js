// Vercel Serverless Function for Discord Interactions
const { verifyKey } = require('discord-interactions');

const DISCORD_PUBLIC_KEY = 'debcded15659157232a39d2869b2a5b2345d5d8e7c1fb7cca23842be689e9f30';

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Signature-Ed25519, X-Signature-Timestamp');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get signature headers
    const signature = req.headers['x-signature-ed25519'];
    const timestamp = req.headers['x-signature-timestamp'];
    
    if (!signature || !timestamp) {
      console.log('Missing Discord signature headers');
      return res.status(401).json({ error: 'Missing signature headers' });
    }

    // Get raw body as string
    const rawBody = JSON.stringify(req.body);
    
    // Verify Discord signature
    const isValidRequest = verifyKey(rawBody, signature, timestamp, DISCORD_PUBLIC_KEY);
    
    if (!isValidRequest) {
      console.log('Invalid Discord signature');
      return res.status(401).json({ error: 'Bad request signature' });
    }

    const interaction = req.body;
    console.log('Discord interaction received:', interaction.type, interaction.data?.name);

    // Handle PING (verification)
    if (interaction.type === 1) {
      return res.json({ type: 1 });
    }

    // Handle Application Command
    if (interaction.type === 2) {
      const commandName = interaction.data?.name || 'unknown';
      
      const responses = {
        stats: {
          content: `🎮 **Nexus Nemesis Player Stats**\n\nAccess your complete player statistics and battle history at:\nhttps://nexus-nemesis-grudgedev.replit.app\n\n⚔️ Track your wins, losses, and card collection progress!`,
          flags: 64
        },
        cards: {
          content: `🃏 **Nexus Nemesis Card Collection**\n\nView and manage your Season 0 card collection at:\nhttps://nexus-nemesis-grudgedev.replit.app\n\n🏆 Discover rare cards and build powerful decks!`,
          flags: 64
        },
        battle: {
          content: `⚔️ **Nexus Nemesis Battle Arena**\n\nEnter the battlefield and challenge other players at:\nhttps://nexus-nemesis-grudgedev.replit.app\n\n🎯 Test your strategies in epic card battles!`,
          flags: 64
        },
        packs: {
          content: `📦 **Nexus Nemesis Card Packs**\n\nOpen card packs and expand your collection at:\nhttps://nexus-nemesis-grudgedev.replit.app\n\n✨ Each pack contains 5 Season 0 cards with rare possibilities!`,
          flags: 64
        },
        marketplace: {
          content: `🏪 **Nexus Nemesis Marketplace**\n\nBuy, sell, and trade cards with other players at:\nhttps://nexus-nemesis-grudgedev.replit.app\n\n💰 Use GBuX tokens for secure transactions!`,
          flags: 64
        },
        leaderboard: {
          content: `🏆 **Nexus Nemesis Leaderboard**\n\nCheck the top players and rankings at:\nhttps://nexus-nemesis-grudgedev.replit.app\n\n🌟 Climb the ranks and prove your skill!`,
          flags: 64
        }
      };

      const response = responses[commandName] || {
        content: `🎮 **Welcome to Nexus Nemesis!**\n\nExperience the ultimate trading card game at:\nhttps://nexus-nemesis-grudgedev.replit.app\n\n⚔️ Collect cards, battle players, and dominate the arena!`,
        flags: 64
      };

      return res.json({
        type: 4,
        data: response
      });
    }

    // Handle other interaction types
    return res.json({
      type: 4,
      data: {
        content: '🎮 Nexus Nemesis interaction processed successfully!',
        flags: 64
      }
    });

  } catch (error) {
    console.error('Discord interaction error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
