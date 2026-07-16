# Paper Reading Library

This directory stores one Markdown note per paper. The public index is
`/learning/paper-reading.html`.

## Add a paper

1. Copy `_templates/paper_reading_template.md` into this directory.
2. Name the file with a stable identifier: `arxiv-id-short-title.md`.
3. Fill in the YAML metadata before writing the note.
4. Keep `tags`, `methods`, `datasets`, and `models` as YAML lists.
5. Separate paper claims from personal hypotheses.

Example filename:

```text
2603.25450-cross-model-disagreement.md
```

## Controlled values

Status:

```text
unread -> skimming -> read -> reproduced -> integrated
```

Relevance:

```text
low | medium | high
```

Use lowercase kebab-case tags, for example:

```text
reasoning
reinforcement-learning
correctness-estimation
cross-model-disagreement
```

## Writing rule

Every important finding should contain:

- Claim
- Evidence
- Experimental condition
- Confidence or caveat

This makes later retrieval more reliable than storing an unstructured summary.
