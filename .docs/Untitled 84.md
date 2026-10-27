To retrieve multiple output formats (YAML, JSON, and Markdown) in a single LLM request (such as through a local Ollama instance or FastAPI backend), standard JSON mode falls short because raw JSON escaping breaks multi-line Markdown text and YAML blocks.
Instead, use XML-delimited prompt engineering combined with a Python post-processing parser or a Pydantic multi-field container schema.
Strategy 1: XML Delimiter Prompting (Recommended)
By instructing the model to wrap each format inside custom XML-like tags, you prevent syntax collision and allow a script to cleanly slice the response into separate files or properties.
System Prompt Template
You are an advanced knowledge curation engine. For the given input, you must generate a response containing THREE distinct sections using exact XML delimiters:
1. YAML frontmatter metadata block
2. A structured JSON payload for programmatic routing
3. A complete Markdown document body

Format your output strictly like this:
<yaml>
title: "Example Title"
type: "research"
confidence: "high"
</yaml>

<json>
{
  "routing_keys": ["obsidian", "architecture"],
  "version": 1
}
</json>

<markdown>
# Example Title
Content goes here with [[wikilinks]].
</markdown>

Strategy 2: Pydantic Structured Output with Ollama (Python)
If you are calling Ollama via Python, you can enforce a strict Pydantic model that holds all three formats as separate string fields.
from pydantic import BaseModel, Field
import ollama

class MultiFormatOutput(BaseModel):
    yaml_frontmatter: str = Field(description="Valid YAML frontmatter string")
    json_payload: str = Field(description="Valid JSON string payload")
    markdown_body: str = Field(description="Complete Markdown document body")

def generate_multi_format(prompt: str):
    response = ollama.chat(
        model='deepseek-r1:14b', # Or your preferred local model
        messages=[{'role': 'user', 'content': prompt}],
        format=MultiFormatOutput.model_json_schema(),
        options={'temperature': 0.1} # Lower temperature for deterministic formatting
    )
    
    # Validate and parse into structured model
    parsed_output = MultiFormatOutput.model_validate_json(response.message.content)
    return parsed_output

Strategy 3: Python Post-Processing Pipeline
When using XML delimiters, a lightweight regex parser splits the single LLM response into individual files (.md, .json, or embedded YAML properties) for your vault or GitLab pipeline:
import re

def parse_multi_format_response(raw_response: str):
    yaml_match = re.search(r"<yaml>(.*?)</yaml>", raw_response, re.DOTALL)
    json_match = re.search(r"<json>(.*?)</json>", raw_response, re.DOTALL)
    md_match = re.search(r"<markdown>(.*?)</markdown>", raw_response, re.DOTALL)

    return {
        "yaml": yaml_match.group(1).strip() if yaml_match else "",
        "json": json_match.group(1).strip() if json_match else "",
        "markdown": md_match.group(1).strip() if md_match else ""
    }

# Example assembly for Obsidian vault ingestion:
# content = f"---\n{parsed['yaml']}\n---\n\n{parsed['markdown']}"

Best Practices for Multi-Format Generation
 * Low Temperature: Set temperature to 0.1 or lower in Ollama to ensure the model strictly respects the requested structural tags without creative drift.
 * Independent Validation: Validate the extracted JSON block independently using json.loads() before writing files to your vault to prevent malformed writes.
 * Pipeline Integration: In your GitLab CI/CD artifact runner, use this single-request approach to ingest raw inputs, generate the metadata (.yaml), state logs (.json), and permanent note body (.md) simultaneously in one pass.
