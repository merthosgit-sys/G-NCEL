import os

os.environ["COQUI_TOS_AGREED"] = "1"


import json
import sys
import torch

from TTS.api import TTS



print("Loading XTTS model...")


device = "cuda" if torch.cuda.is_available() else "cpu"



tts = TTS(
    "tts_models/multilingual/multi-dataset/xtts_v2"
).to(device)



print("XTTS MODEL READY")



speaker = "Ana Florence"



for line in sys.stdin:


    try:


        data = json.loads(line)



        text = data["text"]

        output = data["output"]

        style = data.get(
            "style",
            "neutral"
        )



        print(
            "Generating:",
            output,
            flush=True
        )



        tts.tts_to_file(

            text=text,

            file_path=output,

            speaker=speaker,

            language="tr"

        )



        print(
            json.dumps({

                "status":"ok",

                "output":output

            }),

            flush=True

        )



    except Exception as e:


        print(

            json.dumps({

                "status":"error",

                "message":str(e)

            }),

            flush=True

        )
