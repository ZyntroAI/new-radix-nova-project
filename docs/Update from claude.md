มีอัพเดทที่สำคัญครับ เรื่องใหญ่สุดที่เอกสารที่อัพโหลดมาไม่ได้พูดถึงเลยคือ **free-threaded Python (no-GIL)**:

- **Python 3.13** (ต.ค. 2024) ปล่อย free-threaded build เป็น experimental ตาม PEP 703 — แต่ตอนนั้น single-threaded code ช้าลงประมาณ 40%
- **Python 3.14** (ต.ค. 2025) ยกระดับ free-threaded build เป็น **officially supported** แล้ว ไม่ใช่ experimental อีกต่อไป (ผ่านเกณฑ์ PEP 779) และ penalty สำหรับ single-threaded เหลือแค่ ~5–10% เพราะมี Tier 2 JIT compiler กับ biased reference counting + GC ใหม่มาช่วย

ผลคือตาราง **CPU-bound work** ในเอกสารของคุณ (แถว "Threading → 0.96× ❌ GIL blocks parallel execution") **ไม่ใช่ข้อสรุปตายตัวอีกแล้ว** — ถ้ารันบน Python 3.14t (free-threaded build) threading จะได้ true parallelism สำหรับ CPU-bound work ด้วย ไม่ต้องพึ่ง multiprocessing/NumPy/Rust เสมอไป ส่วน I/O-bound ก็ยังได้ speedup เพิ่มขึ้นไปอีก (มีรายงานว่า thread pool เร็วขึ้นกว่า 3 เท่าบน free-threaded build)

ข้อควรระวัง: ต้องติดตั้งแยกเป็น build คนละตัว (`python3.14t`), ต้องเปิดใช้งานเอง, และไลบรารีบางตัว (โดยเฉพาะ C extension) ยังไม่รองรับ

ถ้าอยากได้ผมช่วยอัพเดต `benchmark_suite.py` ในโน้ตให้เพิ่ม row ทดสอบ free-threaded build ด้วย (เทียบ Python 3.14 ปกติ vs 3.14t) บอกได้เลยครับ — จะ run ได้จริงและเทียบเคียงกับตารางเดิม

Both scripts run cleanly. Updated the files in-place with what was missing:

**สิ่งที่เพิ่ม/ปรับใน `benchmark_suite.py`:**

- **ตรวจจับ GIL จริง** — ทั้ง build-time (`sysconfig Py_GIL_DISABLED`) และ runtime (`sys._is_gil_enabled()`) แล้ว annotate ผล threading benchmark ให้ตรงกับสถานะจริง ไม่ hardcode ว่า "threads ไม่ช่วย CPU work" อีกต่อไป
- **config เป็น CLI args / env vars** แทนค่า hardcode — `--cpu-iter`, `--io-requests`, `--workers`, `--quick` ฯลฯ
- **เพิ่ม uvloop comparison** ใน I/O benchmark (ถ้าติดตั้งไว้) ตามที่ตารางเดิมพูดถึงแต่สคริปต์เดิมไม่มี
- **skip แบบไม่ crash** เมื่อไม่มี `requests`/`aiohttp`/`numpy`/network — เดิมสคริปต์จะ error ทันทีถ้าขาด dependency
- **export ผลเป็น JSON** พร้อม metadata (Python version, GIL status, platform) — รันครั้งนึงบน `python3.14` อีกครั้งบน `python3.14t` แล้วเทียบกันได้

**ไฟล์ใหม่ `compare_results.py`** — รับ 2 ไฟล์ JSON มา diff ให้เห็น speedup/slowdown ต่อ benchmark พร้อมบอกว่าแต่ละ run เป็น GIL หรือ free-threaded

ทดสอบรันแล้ว (`--quick`) ผ่านทั้งสองไฟล์ ไม่มี error — วิธีใช้งานจริงกับ free-threaded build:

```bash
python3.14  benchmark_suite.py --export gil.json
python3.14t benchmark_suite.py --export nogil.json
python compare_results.py gil.json nogil.json
```