OCR QUALITY CONTROL

**OCR quality control** is the process of verifying that extracted text and fields are accurate enough for their intended use before they are stored, searched, published, or used in automated decisions. A good QC process combines input-image checks, OCR confidence signals, ground-truth accuracy testing, business-rule validation, and targeted human review.[1][2]

## What to measure

The core objective is not simply “high OCR confidence.” It is ensuring that the text or data used downstream is correct.

| Metric | What it measures | Best use |
|---|---|---|
| Character Error Rate (CER) | Character-level insertions, deletions, and substitutions compared with verified ground truth | Books, archives, long-form text, serial numbers |
| Word Error Rate (WER) | Word-level errors compared with verified ground truth | Searchable documents, contracts, correspondence |
| Field accuracy | Whether a critical extracted field is exactly correct | Invoices, IDs, forms, claims, medical/legal records |
| Confidence score | OCR engine’s estimate of recognition certainty | Routing work; not sufficient as proof of correctness |
| Validation-rule pass rate | Whether extracted values satisfy format, range, and cross-field rules | Structured documents and automation |
| Human-correction rate | Share of items a reviewer changes | Measuring real production quality and model drift |
| Exception rate | Share routed to manual review | Capacity planning and threshold tuning |

CER and WER are calculated from the edit distance between OCR output and verified ground truth:

$$
\mathrm{CER}=\frac{S_c+D_c+I_c}{N_c}
$$

$$
\mathrm{WER}=\frac{S_w+D_w+I_w}{N_w}
$$

where $$S$$, $$D$$, and $$I$$ are substitutions, deletions, and insertions, and $$N$$ is the number of characters or words in the ground-truth text. A lower rate is better.[3]

## QC workflow

### 1. Control input quality

Reject or flag pages before OCR when they have:

- Low resolution or illegibly small text
- Blur from camera movement or poor focus
- Skewed pages, curved book pages, or incorrect orientation
- Shadows, glare, low contrast, or uneven lighting
- Cropped borders, missing pages, or obscured fields
- Compression artifacts, bleed-through, stains, handwriting, or complex tables

Use preprocessing selectively: deskew, rotate, crop, denoise, normalize contrast, and split multi-document packets before extraction. Poor input quality is a major source of persistent OCR errors.[4]

### 2. Extract with field-level confidence

Keep the original image and store OCR results at the smallest useful unit:

- Page-level confidence for operational triage
- Line or word confidence for review highlighting
- Field-level confidence for structured data
- Bounding boxes to show reviewers exactly where output originated

Do not use a generic threshold such as “confidence ≥ 90%” without calibration. Confidence scores vary by OCR engine, document type, language, font, scan quality, and field type. Test representative documents and compare confidence scores with real verified accuracy before deciding which outputs can be accepted automatically.[1][2]

### 3. Apply automated validations

Automated checks should catch errors that confidence scores miss.

- **Presence checks:** Required fields exist, such as invoice number, date, total, vendor, or ID number.
- **Format checks:** Dates, email addresses, account numbers, currency codes, reference IDs, postal codes, and expected prefixes match defined patterns.
- **Range checks:** Dates are plausible, quantities are non-negative, tax rates are permitted, and amounts fit expected bounds.
- **Cross-field checks:** `subtotal + tax = total`; line-item totals match header totals; issue dates precede expiry dates.
- **Reference checks:** Vendor, customer, product, employee, or account exists in a trusted reference system.
- **Layout checks:** Expected headings, zones, page counts, signatures, or document-type markers are present.
- **Duplicate checks:** Detect repeated document IDs, hashes, or near-identical pages.
- **Anomaly checks:** Flag values far outside normal distributions or pages with unusually low dictionary coverage.

For example, an invoice total can have 99% OCR confidence but still be wrong if an `8` is read as `3`. Recalculating the line items and checking `subtotal + tax = total` may catch the error.

## Review routing

Use a three-tier routing model rather than sending all documents through either fully automated or fully manual processing.

| Route | Typical criteria | Action |
|---|---|---|
| Auto-accept | High calibrated field confidence; all rules pass; no anomaly flags | Store/process automatically |
| Targeted review | One or more low-confidence critical fields; a soft validation fails; unusual layout | Reviewer checks only highlighted fields against the source image |
| Full review | Critical value conflict; missing mandatory fields; severe image defect; suspected tampering | Reviewer validates the complete document and corrects OCR output |

Critical fields deserve stricter policies than ordinary prose. Examples include bank account numbers, amounts payable, passport numbers, medication doses, legal dates, contract clauses, and personal identifiers. For these, require image verification or an independent authoritative check even when OCR confidence is high.

A reviewer interface should display the source image beside extracted text, align the content at line or field level, highlight uncertain regions, and record corrections. Those corrections become valuable labeled data for later calibration and model improvement.[2]

## Build a quality baseline

Create a representative, manually verified **ground-truth set** before production rollout. It should include the full range of real-world variation:

- Every document type and language
- Printed and handwritten content, where applicable
- Clean, average, and degraded scans
- Multiple fonts, templates, vendors, and source devices
- Tables, stamps, signatures, checkboxes, barcodes, and multi-column layouts
- High-risk or high-value document categories

Evaluate by document class and field type. An overall 98% character accuracy can hide unacceptable performance on invoice totals, names, dates, or account numbers.

A practical scorecard might be:

| Segment | Sample size | CER | WER | Critical-field exact accuracy | Human-review rate | Decision |
|---|---:|---:|---:|---:|---:|---|
| Clean typed invoices | 500 | 0.4% | 1.2% | 99.8% | 4% | Auto-accept with validations |
| Smartphone receipts | 500 | 2.8% | 8.6% | 95.1% | 31% | Targeted review |
| Handwritten forms | 300 | 9.5% | 22.0% | 82.3% | 78% | Full review or redesign intake |
| Historical scanned pages | 1,000 | 3.1% | 10.4% | N/A | 15% | Review sampled pages and preserve source image |

These figures are illustrations, not universal acceptance targets. Error tolerance must match the consequence of an error.

## Ongoing monitoring

OCR QC is continuous because source-document quality, vendor formats, languages, and OCR models can change over time.

- Sample completed documents at random, including auto-accepted ones.
- Oversample high-value, low-confidence, novel-layout, and recently changed document types.
- Compare sampled OCR output against human-verified ground truth.
- Track CER, WER, field-exact accuracy, exception rate, reviewer correction rate, and confidence calibration over time.
- Alert on meaningful deviations from the baseline—for example, a sustained CER/WER increase or unexpected rise in low-confidence pages.
- Review model/provider changes before rollout and rerun the benchmark suite.
- Keep the original image, raw OCR output, normalized output, validation results, reviewer corrections, model/version identifier, and timestamp for auditability.

A confidence score is useful only when calibrated: compare “90% confidence” outputs with real verified accuracy to learn whether they actually meet your policy threshold. Scheduled ground-truth comparisons help detect drift and keep automated-routing decisions defensible.[1][5]

## Quality-control checklist

- Define the business consequence of an incorrect character, word, field, or document.
- Preserve the source image and retain a traceable link to every extracted value.
- Establish ground truth from representative real documents.
- Measure CER/WER for text and exact-match accuracy for critical fields.
- Calibrate confidence thresholds per document type and field, not globally.
- Validate formats, ranges, cross-field arithmetic, and trusted reference data.
- Use targeted human review for uncertain or inconsistent extractions.
- Require full review or authoritative verification for high-impact fields.
- Store reviewer corrections and analyze recurring error patterns.
- Monitor trends, detect drift, and revalidate after OCR-engine or template changes.
- Apply access controls and retention rules because OCR outputs often contain personal, financial, health, legal, or confidential information.

การอ้างอิง:
[1] Workspace++ https://community.obsidian.md/plugins/workspace-plus-plus
[2] Security considerations for teams - Obsidian Help https://obsidian.md/help/teams/security
[3] Features https://community.obsidian.md/plugins/rich-table
[4] Bullet - Obsidian Plugin https://community.obsidian.md/plugins/bullet
[5] Interlinear https://community.obsidian.md/plugins/interlinear
[6] A Survey of OCR Evaluation Methods and Metrics and the ... https://arxiv.org/html/2603.25761
[7] 5 Experiments And Results https://arxiv.org/html/2412.15248v2
[8] learn.microsoft.com › en-us › azureCapabilities and limitations of optical character recognition https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/computer-vision/ocr-characteristics-and-limitations
[9] MultiOCR-QA: Dataset for Evaluating Robustness of LLMs in ... - arXiv https://arxiv.org/html/2502.16781v1
[10] OCR Improves Machine Translation for Low-Resource ... https://arxiv.org/html/2202.13274v2
[11] [PDF] Brno Mobile OCR Dataset - arXiv https://arxiv.org/pdf/1907.01307.pdf
[12] End-to-End Page-Level Assessment of Handwritten Text Recognition https://arxiv.org/html/2301.05935v2
[13] AI for Enterprise Document Processing OCR: End-to-End Workflow ... https://www.stackai.com/insights/ai-for-enterprise-document-processing-ocr-end-to-end-workflow-best-practices-and-2026-guide
[14] What is Model Drift in OCR Systems? - llamaindex.ai https://www.llamaindex.ai/glossary/model-drift-in-ocr-systems
[15] OCR Accuracy Explained: How to Improve It https://www.llamaindex.ai/blog/ocr-accuracy
[16] Quality Assurance in OCR-D https://ocr-d.de/en/spec/ocrd_eval.html
[17] OCR Quality Assurance Workflows - handwriting.guru https://handwriting.guru/articles/ocr-quality-assurance/
[18] How to Evaluate OCR Accuracy https://ocr.direct/how-to-evaluate-ocr-accuracy
[19] OCR Benchmarks: IDP Guide https://idp-software.com/guides/ocr-benchmarks/
[20] How should organisations use OCR in identity verification workflows ... https://nhimg.org/faq/how-should-organisations-use-ocr-in-identity-verification-workflows-without-crea/
