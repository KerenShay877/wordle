import requests
import logging
from src.config import GAME_CONFIG

def setup_logging():
    logging.basicConfig(
        filename=GAME_CONFIG['FILE_PATHS']['LOGS'],
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )

def fetch_word_of_day():
    """Fetch word of the day from an API"""
    try:
        response = requests.get(GAME_CONFIG['API_ENDPOINTS']['WORD_OF_DAY'])
        if response.status_code == 200:
            return response.json()['word'].upper()
    except Exception as e:
        logging.error(f"Error fetching word of the day: {str(e)}")
        return None

def get_word_definition(word):
    """Get word definition using Dictionary API"""
    try:
        response = requests.get(f"{GAME_CONFIG['API_ENDPOINTS']['DICTIONARY']}{word}")
        if response.status_code == 200:
            data = response.json()
            return data[0]['meanings'][0]['definitions'][0]['definition']
    except Exception as e:
        logging.error(f"Error fetching word definition: {str(e)}")
        return None

def load_word_set(path: str):
    """Load word set from file"""
    try:
        words_set = set()
        with open(path, 'r') as f:
            for line in f.readlines():
                word = line.strip().upper()
                words_set.add(word)
        return words_set
    except Exception as e:
        logging.error(f"Error loading word set: {str(e)}")
        raise
