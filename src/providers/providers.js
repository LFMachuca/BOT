
const providers = {
    '🙏' : 'Bullnet',
    '❤️' : 'Spp',
    '👍' : 'San Jorge',
    '⚡': 'Satriales'
}

const getProviderByEmoji = emoji => providers[emoji]|| null;

export {getProviderByEmoji}