#!/usr/bin/env python3
"""Генерация картинок через OpenAI Images API (через curl: у python на Mac нет корневых сертификатов).
Ключ берётся ТОЛЬКО из переменной окружения OPENAI_API_KEY, в файлы и чат его не пишем.
Пример: python3 tools/openai_image.py --prompt "..." --out лист.png --model gpt-image-2.5-flare --size 1536x1024 --quality low
Референсы (эталон героя): --ref эталон.png (можно несколько) -> идёт через /images/edits."""
import argparse, base64, json, os, subprocess, sys

def main():
    a = argparse.ArgumentParser()
    a.add_argument("--prompt", required=True)
    a.add_argument("--out", required=True)
    a.add_argument("--model", default="gpt-image-2.5-flare")
    a.add_argument("--size", default="1536x1024")
    a.add_argument("--quality", default="low", choices=["low", "medium", "high", "auto"])
    a.add_argument("--ref", action="append", default=[])
    a = a.parse_args()
    if not os.environ.get("OPENAI_API_KEY"):
        sys.exit("Нет OPENAI_API_KEY в окружении")
    hdr = ["-H", "Authorization: Bearer " + os.environ["OPENAI_API_KEY"]]
    base = ["curl", "-sS", "-m", "300"]
    if not a.ref:
        body = json.dumps({"model": a.model, "prompt": a.prompt, "size": a.size, "quality": a.quality, "n": 1})
        cmd = base + hdr + ["-H", "Content-Type: application/json", "-d", body, "https://api.openai.com/v1/images/generations"]
    else:
        cmd = base + hdr + ["-F", f"model={a.model}", "-F", f"prompt={a.prompt}", "-F", f"size={a.size}", "-F", f"quality={a.quality}"]
        for p in a.ref:
            cmd += ["-F", f"image[]=@{p}"]
        cmd += ["https://api.openai.com/v1/images/edits"]
    r = subprocess.run(cmd, capture_output=True, text=True)
    try:
        d = json.loads(r.stdout)
    except Exception:
        sys.exit("Ошибка запроса: " + (r.stderr or r.stdout)[:300])
    if "error" in d:
        sys.exit("OpenAI: " + str(d["error"].get("message"))[:400])
    open(a.out, "wb").write(base64.b64decode(d["data"][0]["b64_json"]))
    print("OK", a.out, d.get("usage", ""))

if __name__ == "__main__":
    main()
