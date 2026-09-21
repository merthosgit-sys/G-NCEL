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



for line in sys.stdin:


    try:

        data=json.loads(line)


        texts=data["texts"]
        outputs=data["outputs"]


        print(
            json.dumps({
                "status":"generating"
            }),
            flush=True
        )


        for text,output in zip(
            texts,
            outputs
        ):


            tts.tts_to_file(

                text=text,

                file_path=output,

                speaker="Ana Florence",

                language="tr"

            )


            print(
                json.dumps({
                    "status":"file",
                    "output":output
                }),
                flush=True
            )



        print(
            json.dumps({
                "status":"done"
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
