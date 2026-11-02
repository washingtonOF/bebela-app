from PIL import Image
from pathlib import Path
import sys
source=Image.open(sys.argv[1]).convert("RGBA")
root=Path(sys.argv[2])
for name,size in [("mdpi",48),("hdpi",72),("xhdpi",96),("xxhdpi",144),("xxxhdpi",192)]:
    folder=root/f"mipmap-{name}"
    folder.mkdir(parents=True,exist_ok=True)
    icon=source.resize((size,size),Image.Resampling.LANCZOS)
    icon.save(folder/"ic_launcher.png")
    icon.save(folder/"ic_launcher_round.png")
    icon.save(folder/"ic_launcher_foreground.png")
