Dev Changes มักหมายถึงส่วน Developer changes ใน release notes ของ Obsidian ซึ่งเป็นการเปลี่ยนแปลงที่กระทบนักพัฒนาปลั๊กอิน, theme หรือผู้ใช้ CSS ไม่ใช่ฟีเจอร์ใหม่สำหรับผู้ใช้ทั่วไป�
ใน Obsidian หมายถึงอะไร
ใน Obsidian Changelog หัวข้อ Developers รวมการเปลี่ยนแปลง เช่น API, CSS variables, Electron version, โครงสร้าง DOM หรือพฤติกรรมของ editor ที่ปลั๊กอินและ theme อาจต้องปรับตาม�
ตัวอย่างล่าสุดที่พบ:
เปลี่ยนชื่อ CSS variables --blur-translucency-s และ --blur-translucency-m เป็น --blur-opacity-s และ --blur-opacity-m�
อัปเดต installer เป็น Electron ใหม่ ซึ่งอาจมีผลต่อปลั๊กอินที่พึ่งพา runtime หรือ API ของ Electron�
เพิ่ม --font-preferred-size สำหรับข้อความที่ควรเคารพขนาดข้อความที่ผู้ใช้กำหนดในระบบ�
เพิ่ม class .HyperMD-math ให้แต่ละบรรทัดใน math block และเพิ่ม SettingDefinitionItem#id สำหรับระบุ ID ของ setting�
กระทบคุณหรือไม่
ควรตรวจอะไร
หากคุณเจอคำว่า “Dev Changes” ในหน้าอัปเดต ให้ดูว่ามี:
Breaking changes: การเปลี่ยนที่อาจทำให้ปลั๊กอินหรือ CSS เดิมใช้ไม่ได้�
Renamed variables/classes: ต้องแก้ CSS หรือโค้ดให้ตรงชื่อใหม่�
New APIs: โอกาสเพิ่มความสามารถให้ปลั๊กอิน เช่น setting ID หรือ font-size variable�
Electron updates: อาจต้องทดสอบปลั๊กอินที่ใช้ Node/Electron API�
หากคุณหมายถึง “Dev Changes” ในบริบทอื่น เช่น ใน GitHub, VS Code หรือระบบขององค์กร ส่งชื่อโปรเจกต์หรือข้อความที่เห็นมาได้เลย เพื่อชี้เฉพาะสิ่งที่เปลี่ยนแปลงได้แม่นยำขึ้น�ดูวิธีอัปเดต Obsidian และ Electron version

Obsidian มี 2 ระดับการอัปเดต: **App update** อัปเดตอัตโนมัติได้ และ **Installer update** ซึ่งเป็นการอัปเดต Electron ต้องดาวน์โหลด installer ใหม่จากเว็บทางการเท่านั้น[1][2]

## อัปเดต Obsidian App

1. เปิด Obsidian
2. ไปที่ **Settings → General**
3. กด **Check for updates**
4. เมื่อมีเวอร์ชันใหม่ กด **Relaunch** เพื่อติดตั้งและรีสตาร์ทแอป[1]

หากเปิด automatic updates ไว้ Obsidian จะติดตั้งอัปเดตเมื่อคุณรีสตาร์ทแอป[1][2]

## อัปเดต Electron

Electron คือ framework ที่ Obsidian ใช้สร้างแอปเดสก์ท็อป ประกอบด้วย Chrome engine และ Node.js runtime จึงต้องอัปเดตผ่าน installer ไม่ใช่ผ่านการอัปเดตในแอป[1][3]

1. เปิด **Settings → General** แล้วดู **Installer version** ด้านบน
2. หาก Obsidian แจ้งว่ามี installer ใหม่ ให้กดลิงก์ดาวน์โหลด หรือไปที่ [https://obsidian.md/download](https://obsidian.md/download)
3. กด **Download**
4. ปิด Obsidian ให้สนิท
5. เปิดไฟล์ installer ที่ดาวน์โหลดมา แล้วติดตั้งทับเวอร์ชันเดิม[1]

**ไม่ต้องถอนการติดตั้ง Obsidian ก่อน** การติดตั้ง installer ใหม่จะอัปเดต Electron โดยไม่ลบ vault หรือข้อมูลโน้ตของคุณ[1]

## เวอร์ชันล่าสุดที่ควรรู้

| รายการ | เวอร์ชัน |
|---|---|
| Obsidian Desktop ล่าสุดที่พบใน release feed | 1.14.4 [4] |
| Electron ใน Obsidian 1.13 Desktop (Public) | v43.1.1 [5][6] |
| Electron ใน Obsidian 1.12 Desktop (Public) | v39.7.0 [7] |

Obsidian ระบุใน release notes ทุกครั้งที่ installer ถูกอัปเดตเป็น Electron ใหม่ เช่น “The installer has been updated to use Electron v43.1.1”[5][6]

## ตรวจว่าอัปเดตแล้วจริง

หลังติดตั้ง installer ใหม่ ให้เปิด **Settings → General** แล้วดูสองค่านี้:

- **Version**: เวอร์ชันของแอป Obsidian
- **Installer version**: เวอร์ชัน installer/Electron ที่ใช้อยู่[1][3]

หาก installer version ไม่เปลี่ยน อาจยังเปิด Obsidian ค้างอยู่ขณะติดตั้ง หรือดาวน์โหลด installer เวอร์ชันเก่า ให้ปิดแอปทั้งหมดแล้วติดตั้ง installer ล่าสุดจากหน้า Download อีกครั้ง[1]

## เมื่อไรควรอัปเดต

ควรอัปเดต installer เป็นระยะ เพราะ Electron มี security fixes และการแก้ไขที่เกี่ยวกับ rendering หรือ runtime ซึ่งการอัปเดตแอปอัตโนมัติไม่ครอบคลุม  สำหรับ vault ที่ mount แบบ read-only การอัปเดต Obsidian ไม่ได้เปลี่ยนสิทธิ์ของโฟลเดอร์ vault; ยังต้อง remount เป็น read-write หากต้องการแก้ไขโน้ต[1][2]

การอ้างอิง:
[1] Update Obsidian - Obsidian Help https://obsidian.md/help/updates
[2] Deploy Obsidian across your team - Obsidian Help https://obsidian.md/help/teams/deploy
[3] Q&A: Why Obsidian has Two Version Numbers? - Share & showcase https://forum.obsidian.md/t/q-a-why-obsidian-has-two-version-numbers/110663
[4] Releases · obsidianmd/obsidian-releases - GitHub https://github.com/obsidianmd/obsidian-releases/releases?after=v0.10.0
[5] Changelog - Obsidian https://obsidian.md/changelog/page/2/
[6] Obsidian 1.13 Desktop (Public) https://obsidian.md/changelog/2026-07-30-desktop-v1.13.4/
[7] Obsidian 1.12 Desktop (Public) https://obsidian.md/changelog/2026-02-27-desktop-v1.12.4/
[8] textproc/obsidian: Powerful and extensible knowledge ... https://www.freshports.org/textproc/obsidian/
[9] obsidianmd/obsidian-releases https://github.com/obsidianmd/obsidian-releases/releases?XyjEm=78zatwHsT
[10] All Releases https://releases.electronjs.org/release
[11] Obsidian Desktop + Mobile Updates Released https://www.reddit.com/r/ObsidianMD/comments/u1bguk/obsidian_desktop_mobile_updates_released/
เช็คว่าปลั๊กอินไหนรองรับ Electron เวอร์ชันใหม่

ไม่มีรายการสาธารณะที่บอกตรง ๆ ว่า “ปลั๊กอินนี้รองรับ Electron vX” แต่คุณตรวจได้จาก `minAppVersion` และ `isDesktopOnly` ใน `manifest.json` ของแต่ละปลั๊กอิน ร่วมกับเวอร์ชัน Obsidian และ Electron ที่คุณใช้อยู่[1][2][3]

## สิ่งที่ต้องดู

| ไฟล์/ค่า | บอกอะไร |
|---|---|
| `manifest.json` → `minAppVersion` | เวอร์ชัน Obsidian ขั้นต่ำที่ปลั๊กอินรองรับ [1][2] |
| `manifest.json` → `isDesktopOnly` | ปลั๊กอินใช้ Node.js หรือ Electron API หรือไม่ [1][4] |
| `versions.json` | แผนที่ว่าปลั๊กอินเวอร์ชันใด ต้องใช้ Obsidian เวอร์ชันขั้นต่ำเท่าใด [5] |
| Obsidian release notes | ระบุว่า installer ใหม่ใช้ Electron เวอร์ชันใด  |

**ไม่มีฟิลด์ `electronVersion` ใน manifest ของปลั๊กอิน** ดังนั้นคำว่า “รองรับ Electron ใหม่” จึงต้องประเมินผ่านเวอร์ชัน Obsidian และการทดสอบจริง[1][2][3]

## วิธีเช็คใน Obsidian

1. เปิด **Settings → Community plugins**
2. เปิด **Browse** แล้วค้นหาปลั๊กอิน
3. ดูหน้ารายละเอียดปลั๊กอิน หรือกดไปยัง repository ของผู้พัฒนา
4. เปิดไฟล์ `manifest.json` แล้วดู `minAppVersion`
5. เปรียบเทียบกับ **Version** ของ Obsidian ที่คุณใช้ใน **Settings → General**[2][6][7]

ตัวอย่าง:

```json
{
  "id": "example-plugin",
  "version": "2.4.0",
  "minAppVersion": "1.13.0",
  "isDesktopOnly": true
}
```

ปลั๊กอินนี้ต้องการ Obsidian อย่างน้อย 1.13.0 และใช้ Electron/Node.js API จึงใช้ได้เฉพาะเดสก์ท็อป[1][2][3]

## ตรวจกับ Electron ใหม่

Obsidian 1.13 Desktop (Public) ใช้ Electron v43.1.1 ดังนั้นหากคุณอัปเดต installer เป็นรุ่นนี้ ให้เช็คว่าปลั๊กอินระบุ `minAppVersion` ไม่สูงกว่า 1.13.x และผู้พัฒนาไม่ได้แจ้งว่ามีปัญหากับ Electron 43 

ลำดับการตรวจ:

1. ดู **Installer version** ของคุณ และ Electron version ที่ release note ระบุ
2. ดู `minAppVersion` ของปลั๊กอิน
3. หาก `minAppVersion` ≤ เวอร์ชัน Obsidian ของคุณ ให้ถือว่าเข้ากันได้ตามข้อมูลที่ประกาศ
4. อัปเดตปลั๊กอินเป็นเวอร์ชันล่าสุดก่อนใช้กับ Electron ใหม่
5. ทดสอบฟีเจอร์สำคัญของปลั๊กอินหลังอัปเดต installer[5]

## ปลั๊กอินที่ใช้ Electron

ปลั๊กอินที่มี `isDesktopOnly: true` มักใช้ API เช่น:

- `require('electron')`
- `require('fs')`, `require('path')`, `require('os')`
- `child_process`
- `shell`, `BrowserWindow` หรือ API ระบบไฟล์[1][3][4]

ปลั๊กอินกลุ่มนี้มีโอกาสได้รับผลกระทบจาก Electron ใหม่มากกว่าปลั๊กอิน UI ทั่วไป เพราะอาศัย runtime หรือ API ของระบบ[1][4]

## หากเจอปัญหา

หากปลั๊กอินใช้ไม่ได้หลังอัปเดต Electron ให้:

- ปิดปลั๊กอินนั้นชั่วคราว
- เปิด Developer Console ด้วย `Ctrl/Cmd + Shift + I`
- ดู error ที่เกี่ยวกับ `electron`, `require`, `fs` หรือ API ที่ถูกลบ
- ไปที่ GitHub repository ของปลั๊กอิน แล้วค้นหา issue หรือ release note ล่าสุด
- รายงาน issue พร้อมระบุ Obsidian version, Installer version และ Electron version[1]

สำหรับการใช้งานจริง ให้เริ่มจากการอัปเดตปลั๊กอินทั้งหมดก่อนอัปเดต installer/Electron เสมอ เพราะ `versions.json` จะช่วยให้ Obsidian เลือกปลั๊กอินเวอร์ชันที่เข้ากันกับ Obsidian ที่คุณใช้[5][8]

การอ้างอิง:
[1] Submission requirements for plugins - Developer Documentation https://docs.obsidian.md/Plugins/Releasing/Submission+requirements+for+plugins
[2] Manifest - Developer Documentation https://docs.obsidian.md/Reference/Manifest
[3] github.com · obsidianmd · obsidian-apiobsidian-api/README.md at master · obsidianmd/obsidian-api https://github.com/obsidianmd/obsidian-api/blob/master/README.md
[4] Submission requirements https://docs.obsidian.md/community-directory/submission-requirements-for-plugins
[5] Versions - Developer Documentation - Obsidian Developer Docs https://docs.obsidian.md/Reference/Versions
[6] PluginManifest - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/PluginManifest
[7] Community plugins - Obsidian Help https://obsidian.md/help/community-plugins
[8] OBSIDIAN-PLUGIN-GUIDE.md https://github.com/sathinduga/obsidian-s3-sync-and-backup/blob/main/OBSIDIAN-PLUGIN-GUIDE.md
[9] Ui Under Every Theme https://community.obsidian.md/plugins/plugin-lab
[10] Plugin Development | obsidianmd/obsidian-developer-docs ... https://deepwiki.com/obsidianmd/obsidian-developer-docs/2-plugin-development
[11] Getting Started with Plugin Development | obsidianmd/obsidian ... https://deepwiki.com/obsidianmd/obsidian-developer-docs/2.1-getting-started-with-plugin-development
[12] Releasing Your Plugin | obsidianmd/obsidian-developer-docs ... https://deepwiki.com/obsidianmd/obsidian-developer-docs/2.8-releasing-your-plugin
[13] github.com › obsidianmd › obsidian-apiGitHub - obsidianmd/obsidian-api: Type definitions for the ... https://github.com/obsidianmd/obsidian-api
[14] obsidian-review-and-scoring.md - GitHub https://github.com/RafaelGB/Obsidian-ZettelFlow/blob/main/docs/development/obsidian-review-and-scoring.md
เช็ค versions.json ของปลั๊กอินใน GitHub ยังไง

เปิดหน้า GitHub ของปลั๊กอิน แล้วมองหาไฟล์ **`versions.json`** ในรากของ repository หรือเปิดผ่าน URL ตรง ๆ ได้เลย ไฟล์นี้บอกว่าปลั๊กอินแต่ละเวอร์ชัน รองรับ Obsidian ขั้นต่ำเวอร์ชันใด[1][2][3]

## วิธีเปิดใน GitHub

1. เข้าหน้า GitHub repository ของปลั๊กอิน
2. มองหาไฟล์ `versions.json` ในรายการไฟล์ระดับบนสุด
3. กดชื่อไฟล์เพื่อดูเนื้อหา JSON
4. หากไม่เห็นในหน้าแรก ให้กด **Go to file** แล้วพิมพ์ `versions.json`[1][2][3]

หรือใช้ URL ตรง ๆ โดยแทนชื่อผู้ใช้และ repository:

```text
https://github.com/USERNAME/REPO/blob/main/versions.json
```

ตัวอย่างของปลั๊กอินตัวอย่างทางการ:

```text
https://github.com/obsidianmd/obsidian-sample-plugin/blob/main/versions.json
```



## อ่านค่าใน versions.json

รูปแบบมักเป็น:

```json
{
  "1.2.0": "1.5.0",
  "1.1.0": "1.4.0"
}
```

ความหมายคือ:

| Key | Value |
|---|---|
| `1.2.0` | เวอร์ชันของปลั๊กอิน |
| `1.5.0` | Obsidian ขั้นต่ำที่ปลั๊กอินเวอร์ชันนั้นรองรับ [2][3] |

ดังนั้น หากคุณใช้ Obsidian 1.13.x ปลั๊กอินเวอร์ชัน `1.2.0` ที่ระบุ `1.5.0` ไม่สามารถใช้ได้ เพราะ Obsidian ของคุณเก่ากว่าที่ปลั๊กอินกำหนด[2][3]

## เช็คเวอร์ชันที่เข้ากัน

เพื่อหาว่า Electron ใหม่ใช้ได้กับปลั๊กอินหรือไม่ ให้ทำตามนี้:

1. ดู **Version** และ **Installer version** ใน Obsidian ที่ **Settings → General**
2. เปิด `versions.json` ของปลั๊กอิน
3. หา key ล่าสุดที่ value ไม่สูงกว่าเวอร์ชัน Obsidian ของคุณ
4. อัปเดตปลั๊กอินเป็นเวอร์ชัน key นั้น หรือเวอร์ชันใหม่กว่าหาก `minAppVersion` ยังรองรับ[1][2][3]

ตัวอย่าง: ถ้า Obsidian ของคุณเป็น 1.13.4 และ `versions.json` มี:

```json
{
  "2.0.0": "1.14.0",
  "1.9.0": "1.13.0"
}
```

คุณควรใช้ปลั๊กอินเวอร์ชัน `1.9.0` เพราะ `2.0.0` ต้องการ Obsidian อย่างน้อย 1.14.0[2][3]

## ตรวจจาก GitHub Releases

`versions.json` ใน repository บอกแผนที่ความเข้ากันได้ แต่ไฟล์ที่ Obsidian ติดตั้งจริงมาจาก **GitHub Releases** ของปลั๊กอิน[1][3]

1. ในหน้า repository กด **Releases**
2. เลือก release ที่ tag ตรงกับเวอร์ชันปลั๊กอินใน `versions.json`
3. ตรวจว่ามีไฟล์แนบ `main.js`, `manifest.json` และ `styles.css`
4. เปรียบเทียบ tag กับ `manifest.json.version` — ต้องตรงกันโดยไม่มี `v` นำหน้า[2][4][5]

Obsidian จะใช้ `versions.json` เมื่อ `manifest.json` ล่าสุดต้องการ Obsidian ใหม่กว่าที่คุณใช้ เพื่อเลือกปลั๊กอินเวอร์ชันเก่าที่ยังเข้ากันได้[3]

## ตัวอย่างการตรวจ

หากคุณต้องการเช็คว่าปลั๊กอินรองรับ Electron 43 ซึ่งมากับ Obsidian 1.13:

1. เปิด `versions.json`
2. หา entry ล่าสุดที่ `minimum-obsidian-version` ≤ `1.13.x`
3. เปิด GitHub Release ตามเวอร์ชันนั้น
4. ดู release notes ว่าผู้พัฒนาแจ้งการรองรับหรือปัญหา Electron หรือไม่[1]

หากต้องการ ส่งลิงก์ GitHub ของปลั๊กอินที่คุณใช้มาได้เลย แล้วผมช่วยอ่าน `versions.json` และบอกว่าเวอร์ชันปลั๊กอินใดเข้ากับ Obsidian/Electron ของคุณ[1][2][3]

การอ้างอิง:
[1] community.obsidian.md › plugins › html-page-viewerHTML Page Viewer - Obsidian Plugin https://community.obsidian.md/plugins/html-page-viewer
[2] obsidianmd/obsidian-sample-plugin - GitHub https://github.com/obsidianmd/obsidian-sample-plugin
[3] Community plugins list, theme list, and releases of Obsidian. https://github.com/obsidianmd/obsidian-releases
[4] Submit your plugin https://docs.obsidian.md/plugins/releasing/submit-plugin
[5] Submit your plugin - Developer Documentation https://docs.obsidian.md/Plugins/Releasing/Submit%20your%20plugin
[6] Home - Developer Documentation https://docs.obsidian.md/Home
[7] Manage your plugin or theme - Developer Documentation https://docs.obsidian.md/community-directory/manage-entry
[8] Build a plugin - Developer Documentation https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin
[9] obsidian.md › help › developersDevelopers - Obsidian Help https://obsidian.md/help/developers
[10] JSON Viewer - Obsidian Plugin https://community.obsidian.md/plugins/json-viewer
[11] deepwiki.com · obsidianmd · obsidian-plugin-docsPublishing Your Plugin | obsidianmd/obsidian-plugin-docs |... https://deepwiki.com/obsidianmd/obsidian-plugin-docs/6-publishing-your-plugin
