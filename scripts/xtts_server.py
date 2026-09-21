import os

os.environ["COQUI_TOS_AGREED"] = "1"


import json
import sys
import torch

from TTS.api import TTS



print(
    "XTTS MODEL LOADING",
    flush=True
)



device = "cuda" if torch.cuda.is_available() else "cpu"


print(
    "DEVICE:",
    device,
    flush=True
)



try:


    tts = TTS(
        "tts_models/multilingual/multi-dataset/xtts_v2"
    ).to(device)



    print(
        "XTTS MODEL READY",
        flush=True
    )


except Exception as e:


    print(
        json.dumps({

            "status":"startup_error",

            "message":str(e)

        }),

        flush=True
    )


    sys.exit(1)





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
            json.dumps({

                "status":"generating",

                "output":output

            }),

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
