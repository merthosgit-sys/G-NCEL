import os

os.environ["COQUI_TOS_AGREED"] = "1"


import argparse
import torch

from TTS.api import TTS



parser = argparse.ArgumentParser()


parser.add_argument(
    "--text",
    required=True
)


parser.add_argument(
    "--output",
    required=True
)


parser.add_argument(
    "--style",
    default="neutral"
)


args = parser.parse_args()



device = "cuda" if torch.cuda.is_available() else "cpu"



print("--------------------------------")
print("XTTS GENERATION")
print("Device:", device)
print("Style:", args.style)
print("--------------------------------")



tts = TTS(
    "tts_models/multilingual/multi-dataset/xtts_v2"
).to(device)



# XTTS hazır speaker
speaker = "Ana Florence"



tts.tts_to_file(

    text=args.text,

    file_path=args.output,

    speaker=speaker,

    language="tr"

)



print(
    "Voice saved:",
    args.output
)
