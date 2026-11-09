#!/usr/bin/env python3
"""Lightweight tracked-source check; not a replacement for dedicated secret scanning."""
import re
import subprocess
import sys
from pathlib import Path
tracked = subprocess.check_output(["git", "ls-files", "-z"]).decode().split("\0")
patterns = {
    "private key": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----"),
    "GitHub token": re.compile(r"gh[pousr]_[A-Za-z0-9_]{20,}"),
    "AWS access key": re.compile(r"AKIA[0-9A-Z]{16}"),
}
findings = []
for filename in tracked:
    if not filename or filename.startswith(("node_modules/", "dist/")):
        continue
    path = Path(filename)
    if path.suffix.lower() not in {".ts", ".tsx", ".js", ".mjs", ".json", ".yml", ".yaml", ".env", ".txt", ".md", ".xml", ".properties"}:
        continue
    try:
        content = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        continue
    for label, pattern in patterns.items():
        if pattern.search(content):
            findings.append(f"{filename}: possible {label}")
if findings:
    print("Potential secrets detected (values withheld):", *findings, sep="\n")
    sys.exit(1)
print("No matching high-confidence secret patterns in tracked text files.")
