function task() {
  echo ""
  echo "\033[0;36m--------------------------------------------------------\033[0m"
  echo "\033[0;36m\033[1mBUILDING $1\033[0m\033[0m  ~  \033[0;90m$2\033[0m"
  echo "\033[0;36m--------------------------------------------------------\033[0m"
}

# SPECIFICATIONS
task SPECS @liquify/specs
pnpm @specs build

# PARSER
task PARSER @liquify/parser
pnpm @parser build

# ÆSTHETIC
task ÆSTHETIC esthetic
pnpm @esthetic build

# HIGHLIGHT
task HIGHLIGHT @liquify/highlight
pnpm @highlight build

# SERVER
task SERVER @liquify/server
pnpm @server build

# CLIENT
task CLIENT vscode-liquid
pnpm @vscode build

# MOLOKO
task MOLOKO moloko
pnpm @moloko build

# TYPES
task TYPES @liquify/types
pnpm @types build

# AVA
task AVA @liquify/ava
pnpm @ava build

# ÆSTHETIC DOCS
task ÆSTHETIC DOCS esthetic-docs
pnpm @docs:esthetic build
