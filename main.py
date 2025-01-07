"""
A Wordle game implementation in Python.

This module contains the main game logic for a Wordle clone, including both
word-of-the-day and random word modes. It uses colorama for terminal colors
and makes API calls to fetch words and definitions.

Key Components:
    - LetterState: Tracks the state of each letter (correct, present, absent)
    - Wordle: Core game logic including word validation and guess checking
    - fetch_word_of_day(): Gets daily word from external API
    - get_word_definition(): Fetches word definitions from Dictionary API
    - main(): Handles game flow, user input, and display logic

Game Modes:
    1. Word of the Day - Fetches daily word from API
    2. Random Word - Selects random word from local word list
"""
from app import LetterState
from wordle import Wordle
from colorama import Fore, Back, Style, init
import random
import requests
import json
import time
import sys
import os
from src.game import WordleGame
from src.utils import setup_logging
from database.connection import init_db

# Initializing colorama.
init()

def fetch_word_of_day():
    """Fetch word of the day from an API"""
    try:
        response = requests.get("https://words.dev-apis.com/word-of-the-day")
        if response.status_code == 200:
            return response.json()['word'].upper()
    except:
        return None

def get_word_definition(word):
    """Get word definition using Dictionary API"""
    try:
        response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
        if response.status_code == 200:
            data = response.json()
            return data[0]['meanings'][0]['definitions'][0]['definition']
    except:
        return None

def main():
    # Create necessary directories
    os.makedirs('logs', exist_ok=True)
    os.makedirs('data', exist_ok=True)

    # Initialize the database
    init_db()

    # Initialize game
    game = WordleGame()
    
    if not game.load_words():
        return

    # Add login/registration before starting game
    if not game.handle_login():
        return

    if not game.initialize_game():
        return

    while game.wordle.can_attempt:
        guess = input("\nEnter your word: ").strip()
        if not game.handle_guess(guess):
            print("\nGame ended by user.")
            return

    game.show_game_over()

def load_word_set(path: str):
    words_set = set()
    with open(path, 'r') as f:
        for line in f.readlines():
            word = line.strip().upper()
            words_set.add(word)
    return words_set

def display_result(wordle: Wordle):
    print(f"\n{Fore.LIGHTBLUE_EX}Your progress:{Fore.RESET}\n")
    
    for word in wordle.attempts:
        result = wordle.guess(word)
        converted_result = convert_result_to_color(result)
        print(converted_result)
    
    attempts_left = wordle.remaining_attempts
    print(f"\nAttempts remaining: {attempts_left}")
    print("_ " * wordle.word_length * attempts_left)


def convert_result_to_color(result: list[LetterState]):
    result_with_color = []
    for letter in result:
        if letter.is_in_position:
            color = Fore.GREEN
        elif letter.is_in_word:
            color = Fore.YELLOW
        else:
            color = Fore.WHITE
        colored_letter = color + letter.char + Fore.RESET
        result_with_color.append(colored_letter)
    return " ".join(result_with_color)

if __name__ == "__main__":
    main()

    