#!/usr/bin/env python3
# Copyright (C) 2026 Elder Swamp Club, Inc.
# SPDX-License-Identifier: AGPL-3.0-or-later
"""Golden fixtures for the TypeScript edit-list port.

The functions below are copied verbatim from demo-polish (the prototype the
edit list is ported from) so anyone can regenerate the fixtures; the
TypeScript tests in extensions/models/_lib/edit_list_test.ts must reproduce
this output exactly. Run with plain python3 (no dependencies):

    python3 scripts/gen_parity_fixtures.py testdata/parity
"""
import bisect
import difflib
import json
import math
import random
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path

# --- copied from demo-polish -------------------------------------------------

FILLERS = {"um", "umm", "uh", "uhh", "uhm", "erm", "er", "ah", "ahh", "hmm", "hm", "mm", "mhm"}
PAD = 0.25
GROW = (0.3, 0.45)
QUIET_DB = -45
FAST_TARGET = 4.0
MAX_SPEED = 32


@dataclass
class Item:
    kind: str
    token: str
    s: float
    e: float
    keep: bool
    line: int
    text: str = ""
    speed: int = 1


def norm(word):
    return re.sub(r"[^\w']", "", word.lower())


def speed_for(duration):
    return max(2, min(MAX_SPEED, math.ceil(duration / FAST_TARGET)))


def pause_item(s, e, line, fast):
    if fast:
        return Item("pause", f">>{e - s:.1f}s", s, e, True, line, speed=speed_for(e - s))
    return Item("pause", f"~{e - s:.1f}s", s, e, False, line)


def build_items(segments, duration, max_pause, fast_min):
    words = sorted((w for seg in segments for w in seg), key=lambda w: w["s"])
    items, prev_end, line = [], 0.0, 0
    for k, w in enumerate(words):
        gap = w["s"] - prev_end
        if gap > max_pause or (k == 0 and gap > 0.05):
            items.append(pause_item(prev_end, w["s"], line, fast=k > 0 and gap >= fast_min))
        text = w["w"].strip()
        items.append(Item("word", text, w["s"], max(w["e"], w["s"]), norm(text) not in FILLERS, line, text))
        prev_end = max(prev_end, w["e"])
        if re.search(r"[.?!]$", text):
            line += 1
    if words and duration - prev_end > 0.05:
        items.append(pause_item(prev_end, duration, items[-1].line, fast=False))
    for a, b in zip(items, items[1:]):
        if a.kind == b.kind == "word" and a.keep and norm(a.token) and norm(a.token) == norm(b.token) \
                and b.s - a.e < 0.5 and min(a.e - a.s, b.e - b.s) > 0.08:
            a.keep = False
    return items


def clock(t):
    return f"{int(t // 60)}:{int(t % 60):02d}"


def lines_of(items):
    lines = {}
    for it in items:
        lines.setdefault(it.line, []).append(it)
    return lines


def write_edit_file(name, items, max_pause):
    out = [
        f"# demo-polish edit file for {name}",
        f"# max-pause: {max_pause}",
        "# Delete words or lines to cut them. {Braced} text is cut; remove the braces to keep it.",
        "# ~2.4s is a pause. Unbrace one if something is happening on screen during it.",
        "# >>12.0s is a long wait played fast-forward. Change to ~12.0s for normal speed, or brace it to cut.",
        "# Fixing a word's spelling only changes the captions. Save, then re-run demo-polish.",
        "",
    ]
    for n, its in lines_of(items).items():
        toks, group = [], []
        for it in its + [None]:
            if it is not None and not it.keep:
                group.append(it.token)
                continue
            if group:
                toks.append("{" + " ".join(group) + "}")
                group = []
            if it is not None:
                toks.append(it.token)
        out.append(f"{n} [{clock(its[0].s)}] | " + " ".join(toks))
    return "\n".join(out) + "\n"


def parse_tokens(text):
    toks, braced = [], False
    for raw in text.split():
        if raw.startswith("{"):
            braced, raw = True, raw[1:]
        closes = raw.endswith("}")
        raw = raw.rstrip("}")
        if raw:
            toks.append((raw, braced))
        if closes:
            braced = False
    return toks


def apply_edit_file(text, items):
    edited = {}
    for ln in text.splitlines():
        if not ln.strip() or ln.startswith("#"):
            continue
        m = re.match(r"^(\d+) \[[^\]]*\] \|(.*)$", ln)
        if not m:
            continue
        edited[int(m.group(1))] = parse_tokens(m.group(2))
    for n, its in lines_of(items).items():
        toks = edited.get(n, [])
        for it in its:
            it.keep = False
        sm = difflib.SequenceMatcher(None, [it.token for it in its], [t for t, _ in toks], autojunk=False)
        for op, i1, i2, j1, j2 in sm.get_opcodes():
            if op == "equal" or (op == "replace" and i2 - i1 == j2 - j1):
                for it, (tok, braced) in zip(its[i1:i2], toks[j1:j2]):
                    it.keep = not braced
                    if it.kind == "word":
                        it.text = tok
                    else:
                        it.speed = speed_for(it.e - it.s) if tok.startswith(">>") else 1
            elif op == "replace":
                braced = all(b for _, b in toks[j1:j2])
                words = [it for it in its[i1:i2] if it.kind == "word"]
                for it in its[i1:i2]:
                    it.keep, it.speed = not braced, 1
                for k, it in enumerate(words):
                    it.text = " ".join(t for t, _ in toks[j1:j2]) if k == 0 else ""


def settle(spans, db):
    def edge(t, direction, limit):
        i, reach = round(t * 100), round(min(GROW[direction > 0], abs(limit - t)) * 100)
        window = [i + direction * k for k in range(reach + 1) if 0 <= i + direction * k < len(db)]
        if not window:
            return t
        for k, j in enumerate(window):
            if all(db[min(j + direction * m, len(db) - 1)] < QUIET_DB for m in range(3)):
                return (j + direction * min(3, len(window) - 1 - k)) / 100
        return min(window, key=lambda j: db[j]) / 100

    for k, span in enumerate(spans):
        if k + 1 < len(spans) and spans[k + 1][0] - span[1] > 0.02:
            span[1] = max(span[1], edge(span[1], 1, spans[k + 1][0]))
        if k and span[0] - spans[k - 1][1] > 0.02:
            span[0] = min(span[0], edge(span[0], -1, spans[k - 1][1]))
    return spans


def keep_spans(items, fps, db=None):
    spans = []

    def add(s, e, speed=1):
        if spans:
            if s <= spans[-1][1] + 1e-3 and spans[-1][2] == speed:
                spans[-1][1] = max(spans[-1][1], e)
                return
            s = max(s, spans[-1][1])
        if e - s > 1e-3:
            spans.append([s, e, speed])

    for i, it in enumerate(items):
        prev = items[i - 1] if i else None
        nxt = items[i + 1] if i + 1 < len(items) else None
        if it.keep:
            add(it.s, it.e, it.speed)
        elif it.kind == "pause":
            air = min(PAD, (it.e - it.s) / 2)
            if prev and prev.keep:
                add(it.s, it.s + air)
            if nxt and nxt.keep:
                add(it.e - air, it.e)
        if nxt and it.kind == nxt.kind == "word" and nxt.s > it.e:
            if it.keep and nxt.keep:
                add(it.e, nxt.s)
            elif it.keep:
                add(it.e, it.e + min(PAD, nxt.s - it.e))
            elif nxt.keep:
                add(nxt.s - min(PAD, nxt.s - it.e), nxt.s)
    if db:
        spans = settle(spans, db)
    snapped = []
    for s, e, speed in spans:
        s, e = round(s * fps) / fps, round(e * fps) / fps
        if snapped:
            s = max(s, snapped[-1][1])
        if e <= s:
            continue
        if snapped and s <= snapped[-1][1] and snapped[-1][2] == speed:
            snapped[-1][1] = e
        else:
            snapped.append([s, e, speed])
    return snapped


def output_starts(spans, fps):
    starts, acc = [], 0.0
    for s, e, speed in spans:
        starts.append(acc)
        acc += math.ceil(round((e - s) * fps) / speed) / fps
    return starts, acc


def srt_time(t):
    ms = round(t * 1000)
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"


def write_srt(items, spans, fps, shift=0.0):
    starts = [s for s, _, _ in spans]
    offsets, total = output_starts(spans, fps)

    def remap(t):
        k = bisect.bisect_right(starts, t) - 1
        if k < 0:
            return 0.0
        s, e, speed = spans[k]
        return offsets[k] + min(max(t - s, 0.0), e - s) / speed

    cues, cur, sentence_start = [], [], True
    for it in items:
        if it.kind != "word" or not it.keep or not it.text:
            continue
        if sentence_start:
            it.text = it.text[0].upper() + it.text[1:]
        sentence_start = bool(re.search(r"[.?!]$", it.text))
        s, e = remap(it.s), remap(it.e)
        if cur:
            length = len(" ".join(w for _, _, w in cur)) + 1 + len(it.text)
            if length > 42 or s - cur[-1][1] > 0.6 or e - cur[0][0] > 3.5 or re.search(r"[.?!]$", cur[-1][2]):
                cues.append(cur)
                cur = []
        cur.append((s, e, it.text))
    if cur:
        cues.append(cur)
    out = []
    for n, cue in enumerate(cues):
        start = cue[0][0] + shift
        end = cue[-1][1] + shift + 0.3
        if n + 1 < len(cues):
            end = min(end, cues[n + 1][0][0] + shift)
        out.append(f"{n + 1}\n{srt_time(start)} --> {srt_time(max(end, start + 0.3))}\n"
                   + " ".join(w for _, _, w in cue) + "\n")
    return "\n".join(out), total

# --- fixture generation ------------------------------------------------------

VOCAB = ("so let me show you how this works we will build a swamp extension that checks the "
         "public status pages and reports any service having an issue today").split()


def synth_take(rng, n_words):
    """A plausible take: sentences, fillers, repeats, ghost words, waits."""
    words, t = [], rng.uniform(0.0, 3.0)
    for k in range(n_words):
        r = rng.random()
        if r < 0.08:
            w = rng.choice(["um,", "uh,", "Um,", "uh", "hmm."])
        elif r < 0.12 and words:
            w = words[-1]["w"].strip()  # stutter repeat
        else:
            w = rng.choice(VOCAB)
            if rng.random() < 0.12:
                w += rng.choice([".", "?", "!", ","])
        d = rng.choice([0.02, 0.15, 0.22, 0.31, 0.4, 0.55])
        words.append({"w": " " + w, "s": round(t, 2), "e": round(t + d, 2)})
        gap = rng.random()
        if gap < 0.04:
            t += d + rng.uniform(4.0, 40.0)  # agent wait
        elif gap < 0.12:
            t += d + rng.uniform(1.5, 3.9)  # trimmed pause
        else:
            t += d + rng.choice([0.0, 0.05, 0.1, 0.3, 0.6])
    segs, cur = [], []
    for w in words:
        cur.append(w)
        if len(cur) >= rng.randint(4, 15):
            segs.append(cur)
            cur = []
    if cur:
        segs.append(cur)
    return segs, t + rng.uniform(0.0, 4.0)


def synth_energy(rng, words, duration):
    db = [round(rng.uniform(-70, -50), 1) for _ in range(int(duration * 100) + 1)]
    for seg in words:
        for w in seg:
            for j in range(int(w["s"] * 100) - rng.randint(0, 20), int(w["e"] * 100) + rng.randint(0, 30)):
                if 0 <= j < len(db):
                    db[j] = round(rng.uniform(-40, -10), 1)
    return db


def hand_edit(rng, text):
    """The edits a person makes: unbrace, brace, delete, retype, slow a wait."""
    out = []
    for ln in text.splitlines():
        if ln.startswith("#") or not ln.strip():
            out.append(ln)
            continue
        head, body = ln.split("|", 1)
        toks = body.split()
        inside, braced = [], False  # which tokens sit in a {group}
        for t in toks:
            braced = braced or t.startswith("{")
            inside.append(braced)
            braced = braced and not t.endswith("}")
        r = rng.random()
        if r < 0.1:
            continue  # delete the whole line
        if r < 0.25 and toks:
            i = rng.randrange(len(toks))
            toks[i] = toks[i] if inside[i] else "{" + toks[i] + "}"
        elif r < 0.35:
            toks = [t.replace("{", "").replace("}", "") for t in toks]
        elif r < 0.45 and toks:
            i = rng.randrange(len(toks))
            if not toks[i].startswith(("{", "~", ">>")) and not toks[i].endswith("}"):
                toks[i] = rng.choice(["Kubernetes", "swamp-club", "Status pages"])
        elif r < 0.55:
            toks = [("~" + t[2:]) if t.startswith(">>") else t for t in toks]
        elif r < 0.6 and len(toks) > 2:
            i = rng.randrange(len(toks))
            if "{" not in toks[i] and "}" not in toks[i]:
                del toks[i]
        out.append(head + "| " + " ".join(toks))
    return "\n".join(out) + "\n"


def main():
    out_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "testdata/parity")
    out_dir.mkdir(parents=True, exist_ok=True)
    for case in range(12):
        rng = random.Random(4103 + case)
        segs, duration = synth_take(rng, rng.randint(30, 260))
        fps = rng.choice([30, 60, 29.97])
        max_pause = rng.choice([1.5, 1.0, 2.0])
        fast_min = 4.0
        db = synth_energy(rng, segs, duration) if case % 3 else None
        items = build_items(segs, duration, max_pause, fast_min)
        edit_txt = write_edit_file("take.mkv", items, max_pause)
        built = [asdict(it) for it in items]
        edited_txt = hand_edit(rng, edit_txt)
        apply_edit_file(edited_txt, items)
        applied = [asdict(it) for it in items]
        spans = keep_spans(items, fps, db)
        starts, total = output_starts(spans, fps)
        srt, _ = write_srt(items, spans, fps, shift=3.8 if case % 2 else 0.0)
        fixture = {
            "segments": segs, "duration": duration, "fps": fps, "maxPause": max_pause, "fastMin": fast_min,
            "db": db, "built": built, "editTxt": edit_txt, "editedTxt": edited_txt, "applied": applied,
            "spans": spans, "starts": starts, "total": total, "srt": srt, "shift": 3.8 if case % 2 else 0.0,
        }
        (out_dir / f"case_{case:02d}.json").write_text(json.dumps(fixture))
    print(f"wrote 12 fixtures to {out_dir}")


if __name__ == "__main__":
    main()
