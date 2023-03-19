#!/bin/bash

ver=v1.16.0                       # ACE VERSION TO CLONE
ace=./node_modules/.ace           # ACE OUTPUT DIRECTORY LOCATION
src=./src/build                   # SRC FILES USED WHEN BUILDING ACE
out=../..                         # CD DIRECTORY TO GET BACK TO ROOT

#---------------------------------------------------------------------------
# DOWNLOAD THE ACE PROJECT AND INSTALL
#---------------------------------------------------------------------------

# 1. REMOVE THE TEMP DIRECTORY WHERE ACE WILL BUILD
# echo -e "\033[0;32mCleaning Ace Build Directory\033[0m"
# rm -rf $ace

# # 2. COMPILE THE POTION THEME
# echo -e "\033[0;32mCompiling Potion Theme\033[0m"
# node ./scripts/ace.mjs

# # 3. CLONE ACE FROM GITHUB
# echo -e "\033[0;32mCloning Ace $ver from https://github.com/ajaxorg/ace.git\033[0m"
# git -c advice.detachedHead=false clone --depth 1 --branch $ver https://github.com/ajaxorg/ace.git $ace/

# # 4. CD INTO THE DIRECTORY AND RUN NPM INSTALL
# echo -e "\033[0;32mInstall Ace\033[0m"
# cd $ace && npm install --silent && cd $out

#---------------------------------------------------------------------------
# REPLACE ACE LIQUID MODE
#---------------------------------------------------------------------------

# 5. WE REPLACE THE STANDARD LIQUID MODE WE THE MOLOKO VERSION
echo -e "\033[0;32mReplacing Liquid Mode\033[0m"
cp $src/mode/liquid.js $ace/src/mode/liquid.js

# 6. WE REPLACE THE STANDARD LIQUID HIGHLIGHT RULES WITH THE MOLOKO VERSION
echo -e "\033[0;32mReplacing Liquid Syntax\033[0m"
cp $src/mode/liquid-highlight.js $ace/src/mode/liquid_highlight_rules.js

#---------------------------------------------------------------------------
# ADD ADDITIONAL LIQUID SUPPORT
#---------------------------------------------------------------------------

# 7. ADD LIQUID CSS LANGUAGE MODE SUPPORT
echo -e "\033[0;32mCreating Liquid CSS Mode\033[0m"
cp $src/mode/liquidcss.js $ace/src/mode/liquidcss.js

# 8. ADD LIQUID CSS LANGUAGE HIGHLIGHT RULES SUPPORT
echo -e "\033[0;32mCreating Liquid CSS Syntax\033[0m"
cp $src/mode/liquidcss-highlight.js $ace/src/mode/liquidcss_highlight_rules.js

# 9. ADD LIQUID SCSS LANGUAGE MODE SUPPORT
echo -e "\033[0;32mCreating Liquid SCSS Mode\033[0m"
cp $src/mode/liquidscss.js $ace/src/mode/liquidscss.js

# 10. ADD LIQUID SCSS LANGUAGE HIGHLIGHT RULES SUPPORT
echo -e "\033[0;32mCreating Liquid SCSS Syntax\033[0m"
cp $src/mode/liquidscss-highlight.js $ace/src/mode/liquidscss_highlight_rules.js

# 11. ADD LIQUID JAVASCRIPT LANGUAGE MODE SUPPORT
echo -e "\033[0;32mCreating Liquid JavaScript Mode\033[0m"
cp $src/mode/liquidjs.js $ace/src/mode/liquidjs.js

# 12. ADD LIQUID JAVASCRIPT LANGUAGE HIGHLIGHT RULES SUPPORT
echo -e "\033[0;32mCreating Liquid JavaScript Syntax\033[0m"
cp $src/mode/liquidjs-highlight.js $ace/src/mode/liquidjs_highlight_rules.js

# 13. ADD LIQUID TYPESCRIPT LANGUAGE MODE SUPPORT
echo -e "\033[0;32mCreating Liquid TypesScript Mode\033[0m"
cp $src/mode/liquidts.js $ace/src/mode/liquidts.js

# 14. ADD LIQUID TYPESCRIPT LANGUAGE HIGHLIGHT RULES SUPPORT
echo -e "\033[0;32mCreating Liquid TypesScript Syntax\033[0m"
cp $src/mode/liquidts-highlight.js $ace/src/mode/liquidts_highlight_rules.js

#---------------------------------------------------------------------------
# ADD THE CUSTOM POTION THEME
#---------------------------------------------------------------------------

# 15. COPY THE POTION THEME JS EXPORT
echo -e "\033[0;32mCreating Potion Theme Export\033[0m"
cp $src/theme/potion.js $ace/src/theme/potion.js

# 16. COPY THE POTION THEME CSS EXPORT
echo -e "\033[0;32mCreating Potion Theme CSS\033[0m"
cp $src/theme/potion.css.js $ace/src/theme/potion.css.js

#---------------------------------------------------------------------------
# REMOVE THE ACE TYPE DECLARATION
#---------------------------------------------------------------------------

# 17. REMOVE THE TYPE DECLATATION AS WE USE A LOCAL ONE
echo -e "\033[0;32mRemove Ace Declaration ace.d.ts\033[0m"
rm -rf $ace/ace.d.ts

#---------------------------------------------------------------------------
# RUN THE DRY ICE FILE FROM ACE TO CREATE BUILD FILES
#---------------------------------------------------------------------------

# 18. CREATE THE ACE BUILD
echo -e "\033[0;32mGenerating Standard Ace Build\033[0m"
cd $ace && node Makefile.dryice.js  && cd $out

# 19. CREATE THE ACE BUILD MINIFIED FOR WORKER SUPPORT
echo -e "\033[0;32mGenerating Minified Ace Build\033[0m"
cd $ace && node Makefile.dryice.js --m  && cd $out
