function task() {

  prefix="\033[0;90m[\033[0mTYPES\033[0;90m]\033[0m\033[0;32m COPY \033[0m"
  echo "${prefix}\033[0;36m\033[1m$1\033[0m\033[0m"

  rm -rf $2
  mkdir -p $2

}

OUT=..

# COPY PARSER TYPES
task @liquify/parser parser
cp $OUT/parser/package/*.d.ts parser

# COPY SPECS TYPES
task @liquify/specs specs
cp -R $OUT/specs/package/index.d.ts specs

# COPY ÆSTHETIC TYPES
task esthetic esthetic
mkdir -p esthetic/types
cp -R $OUT/esthetic/types/* esthetic/types
cp -R $OUT/esthetic/index.d.ts esthetic

# COPY HIGHLIGHT TYPES
task @liquify/highlight highlight
cp -R $OUT/highlight/index.d.ts highlight

# COPY MOLOKO TYPES
task moloko moloko
mkdir -p moloko/types
cp -R $OUT/moloko/types/* moloko/types
cp -R $OUT/moloko/index.d.ts moloko
