import os

GAME_CONFIG = {
    'MAX_ATTEMPTS': 6,
    'WORD_LENGTH': 5,
    'SCORE_SETTINGS': {
        'BASE_SCORE': 100,
        'ATTEMPT_PENALTY': 10,
        'TIME_PENALTY_INTERVAL': 10
    },
    'API_ENDPOINTS': {
        'WORD_OF_DAY': 'https://words.dev-apis.com/word-of-the-day',
        'DICTIONARY': 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    },
    'FILE_PATHS': {
        'DATABASE': os.path.join('data', 'wordle_player_data.db'),
        'GUEST_STATS': os.path.join('data', 'guest_gameplay_history.json'),
        'WORD_LIST': os.path.join('data', 'wordle_words.txt'),
        'LOGS': os.path.join('logs', 'wordle_game.log')
    }
}

COLORS = {
    'title': '\033[92m',  # green
    'error': '\033[91m',  # red
    'success': '\033[94m',  # blue
    'hint': '\033[95m',  # magenta
    'score': '\033[93m',  # yellow
    'reset': '\033[0m'    # reset
}
