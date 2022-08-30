"""
This requires Tkinter as an additional dependency.

MacOs:
brew install tcl-tk

Ubuntu:
apt install ghostscript python3-tk

Windows:
https://www.activestate.com/products/tcl/
"""


import camelot
from os import path
import logging
import sys


logging.basicConfig(stream=sys.stdout, level=logging.INFO)

tables = camelot.read_pdf(filepath=path.join('handelsuniversum', 'stammdaten20220825.pdf'), pages='1-2',
                          flavor='stream', columns=["76.60377358490567,171.44654088050314,322.8301886792453,401.25786163522014,470.5660377358491,621.9496855345913,802.5157232704403,891.8867924528303,1061.5094339622642"])
print(tables[0].df.to_markdown())

# camelot.plot(tables[1], kind='contour').show()

