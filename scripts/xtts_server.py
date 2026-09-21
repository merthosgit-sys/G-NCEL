import os

os.environ["COQUI_TOS_AGREED"] = "1"


import json
import sys
import torch

from TTS.api import TTS



print("XTTS MODEL LOADING", flush=True)



device = "cuda" if torch.cuda.is_available() else "cpu"


print(
    "DEVICE:",
    device,
    flush=True
)



tts = TTS(
    "tts_models/multilingual/multi-dataset/xtts_v2"
).to(device)



print(
    "XTTS MODEL READY",
    flush=True
)





speaker = "Ana Florence"






for line in sys.stdin:


    try:


        data = json.loads(line)



        text = data["text"]

        output = data["output"]



        print(
            "GENERATING VOICE",
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
