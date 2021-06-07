# weave-gitops

Weave GitOps core

[![Coverage Status](https://coveralls.io/repos/github/weaveworks/weave-gitops/badge.svg?branch=main)](https://coveralls.io/github/weaveworks/weave-gitops?branch=main)
![Test status](https://github.com/weaveworks/weave-gitops/actions/workflows/test.yml/badge.svg)
[![LICENSE](https://img.shields.io/github/license/weaveworks/weave-gitops)](https://github.com/weaveworks/weave-gitops/blob/master/LICENSE)
[![Contributors](https://img.shields.io/github/contributors/weaveworks/weave-gitops)](https://github.com/weaveworks/weave-gitops/graphs/contributors)
[![Release](https://img.shields.io/github/v/release/weaveworks/weave-gitops?include_prereleases)](https://github.com/weaveworks/weave-gitops/releases/latest)

## UI Development

To set up a development environment for the UI

1. Install go v1.16
2. Install Node.js version 14.15.1
3. Install reflex for automated server builds: go get github.com/cespare/reflex
4. Run `npm install`
5. To start up the HTTP server with automated re-compliation, run `make ui-dev`
6. Run `npm start` to start the frontend dev server (with hot-reloading)

Lint frontend code with `make ui-lint`

Run frontend tests with `make ui-test`

Check dependency vulnerabilities with `make ui-audit`

### Recommended Snippets

To create a new styled React component (with typescript):

```json
{
  "Export Default React Component": {
    "prefix": "tsx",
    "body": [
      "import * as React from 'react';",
      "import styled from 'styled-components'",
      "",
      "type Props = {",
      "  className?: string",
      "}",
      "",
      "function ${1:} ({ className }: Props) {",
      "  return (",
      "    <div className={className}>",
      "      ${0}",
      "    </div>",
      "  );",
      "}",
      "",
      "export default styled(${1:})``"
    ],
    "description": "Create a default-exported, styled React Component."
  }
}
```
