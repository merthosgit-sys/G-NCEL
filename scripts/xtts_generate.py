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



tts = TTS(
"tts_models/multilingual/multi-dataset/xtts_v2"
).to(device)



tts.tts_to_file(

text=args.text,

file_path=args.output,

speaker_wav=None,

language="tr"

)
