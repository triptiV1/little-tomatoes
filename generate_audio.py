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

AUDIO_DIR = os.path.join(os.getcwd(), "assets", "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

# Default voice settings for assessment
TEACHER_VOICE = "en-US-JennyNeural"

# Tommy Tomato voice settings (Mickey Mouse cartoon squeaky style)
TOMMY_VOICE = "en-US-EricNeural"
TOMMY_PITCH = "+75Hz"
TOMMY_RATE = "+5%"

PHRASES = {
    # Onboarding Questions (Teacher voice)
    "q1.mp3": {"text": "Which comes next in the pattern?", "voice": TEACHER_VOICE},
    "q2.mp3": {"text": "If you have 3 apples and get 1 more, how many do you have?", "voice": TEACHER_VOICE},
    "q3.mp3": {"text": "A glove goes on a hand. A shoe goes on a...", "voice": TEACHER_VOICE},
    "q4.mp3": {"text": "Pete shows you: car, pizza, star. What was in the middle?", "voice": TEACHER_VOICE},
    "q5.mp3": {"text": "Your crayon breaks while drawing. What should you do?", "voice": TEACHER_VOICE},
    
    # Options (Teacher voice)
    "opt_blue_circle.mp3": {"text": "Blue circle", "voice": TEACHER_VOICE},
    "opt_red_circle.mp3": {"text": "Red circle", "voice": TEACHER_VOICE},
    "opt_yellow_circle.mp3": {"text": "Yellow circle", "voice": TEACHER_VOICE},
    "opt_green_circle.mp3": {"text": "Green circle", "voice": TEACHER_VOICE},
    "opt_2.mp3": {"text": "Two", "voice": TEACHER_VOICE},
    "opt_3.mp3": {"text": "Three", "voice": TEACHER_VOICE},
    "opt_4.mp3": {"text": "Four", "voice": TEACHER_VOICE},
    "opt_5.mp3": {"text": "Five", "voice": TEACHER_VOICE},
    "opt_foot.mp3": {"text": "Foot", "voice": TEACHER_VOICE},
    "opt_head.mp3": {"text": "Head", "voice": TEACHER_VOICE},
    "opt_finger.mp3": {"text": "Finger", "voice": TEACHER_VOICE},
    "opt_arm.mp3": {"text": "Arm", "voice": TEACHER_VOICE},
    "opt_pizza.mp3": {"text": "Pizza", "voice": TEACHER_VOICE},
    "opt_car.mp3": {"text": "Car", "voice": TEACHER_VOICE},
    "opt_star.mp3": {"text": "Star", "voice": TEACHER_VOICE},
    "opt_balloon.mp3": {"text": "Balloon", "voice": TEACHER_VOICE},
    "opt_try_color.mp3": {"text": "Try another color", "voice": TEACHER_VOICE},
    "opt_cry.mp3": {"text": "Cry and scream", "voice": TEACHER_VOICE},
    "opt_stop.mp3": {"text": "Stop drawing", "voice": TEACHER_VOICE},
    "opt_throw.mp3": {"text": "Throw it away", "voice": TEACHER_VOICE},
    
    # Feedback (Teacher voice)
    "yay.mp3": {"text": "Yay! You got it!", "voice": TEACHER_VOICE},
    "good_try.mp3": {"text": "Good try!", "voice": TEACHER_VOICE},
    
    # Welcome Screen (Tommy Tomato - cute, high-energy child voice)
    "welcome_greeting.mp3": {
        "text": "Hi! I am Tommy Tomato. Welcome! Let's grow together.",
        "voice": TOMMY_VOICE,
        "pitch": "+20Hz",
        "rate": "+0%"
    }
}

async def generate_speech(filename, settings):
    filepath = os.path.join(AUDIO_DIR, filename)
    text = settings["text"]
    voice = settings["voice"]
    pitch = settings.get("pitch", "+0Hz")
    rate = settings.get("rate", "+0%")
    
    print(f"Generating: {filename} ({voice}, pitch={pitch}, rate={rate}) -> '{text}'")
    communicate = edge_tts.Communicate(text, voice, pitch=pitch, rate=rate)
    await communicate.save(filepath)

async def main():
    tasks = []
    for filename, settings in PHRASES.items():
        tasks.append(generate_speech(filename, settings))
    await asyncio.gather(*tasks)
    print("\nAll custom-voiced neural audio files successfully generated in assets/audio/!")

if __name__ == "__main__":
    asyncio.run(main())
