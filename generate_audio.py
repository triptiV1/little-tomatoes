import os
import subprocess
import sys

def install_and_import(package):
    try:
        __import__(package)
    except ImportError:
        print(f"Installing {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

# Make sure edge-tts is installed
install_and_import("edge_tts")

import asyncio
import edge_tts

# Define phrases to speak and save
VOICE = "en-US-JennyNeural" # Warm, clear preschool teacher style voice
AUDIO_DIR = os.path.join(os.getcwd(), "assets", "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

PHRASES = {
    # Questions
    "q1.mp3": "Which comes next in the pattern?",
    "q2.mp3": "If you have 3 apples and get 1 more, how many do you have?",
    "q3.mp3": "A glove goes on a hand. A shoe goes on a...",
    "q4.mp3": "Pete shows you: car, pizza, star. What was in the middle?",
    "q5.mp3": "Your crayon breaks while drawing. What should you do?",
    
    # Options
    "opt_blue_circle.mp3": "Blue circle",
    "opt_red_circle.mp3": "Red circle",
    "opt_yellow_circle.mp3": "Yellow circle",
    "opt_green_circle.mp3": "Green circle",
    "opt_2.mp3": "Two",
    "opt_3.mp3": "Three",
    "opt_4.mp3": "Four",
    "opt_5.mp3": "Five",
    "opt_foot.mp3": "Foot",
    "opt_head.mp3": "Head",
    "opt_finger.mp3": "Finger",
    "opt_arm.mp3": "Arm",
    "opt_pizza.mp3": "Pizza",
    "opt_car.mp3": "Car",
    "opt_star.mp3": "Star",
    "opt_balloon.mp3": "Balloon",
    "opt_try_color.mp3": "Try another color",
    "opt_cry.mp3": "Cry and scream",
    "opt_stop.mp3": "Stop drawing",
    "opt_throw.mp3": "Throw it away",
    
    # Feedback
    "yay.mp3": "Yay! You got it!",
    "good_try.mp3": "Good try!",
    
    # Welcome Screen
    "welcome_greeting.mp3": "Hello big thinkers! Welcome to my world! I'm Tommy Tomato, and I'm so excited to grow and play with you, my little tomato friends! Let's start growing! Tap me to hear me talk!"
}

async def generate_speech(filename, text):
    filepath = os.path.join(AUDIO_DIR, filename)
    print(f"Generating: {filename} -> '{text}'")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(filepath)

async def main():
    tasks = []
    for filename, text in PHRASES.items():
        tasks.append(generate_speech(filename, text))
    await asyncio.gather(*tasks)
    print("\nAll neural audio files successfully generated in assets/audio/!")

if __name__ == "__main__":
    asyncio.run(main())
