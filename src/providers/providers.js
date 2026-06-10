
const providers = {
    '🙏' : 'Bullnet',
    '❤️' : 'Spp',
    '👍' : 'San Jorge',
    '⚡': 'Satriales',
    '✂️' :'Efe',
    '🇮🇱':'Eli',
    '🚬':'Tomas Mac',
    '🖖':'Bulnes',
    '😯':'Kevin',
    '🛠️':'Ike',
    '🇧🇷':'Carleto',
    '📚':'Mop',
    '🪬':'Activa',
    '🚨':'Averno',
    '🇧🇴':'Arghal',
    '✈️':'Delta',
    '🅰️':'Homero'
}

const getProviderByEmoji = emoji => providers[emoji]|| null;

export {getProviderByEmoji}