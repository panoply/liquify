dir=./node_modules/.specs     # ACE OUTPUT DIRECTORY LOCATION
src=./data/                   # SRC FILES CONTAINING DATA
out=../..                     # CD DIRECTORY TO GET BACK TO ROOT

#---------------------------------------------------------------------------
# DOWNLOAD THE SHOPIFY DOCS PROJECT AND INSTALL
#---------------------------------------------------------------------------

# 1. REMOVE THE TEMP DIRECTORY WHERE  SHOPIFY DOCS WILL BUILD
echo -e "\033[0;32mCleaning Shopify Documentation References\033[0m"
rm -rf $dir

# 3. CLONE ACE FROM GITHUB
echo -e "\033[0;32mCloning Shopify Theme Docs $ver from https://github.com/Shopify/theme-liquid-docs\033[0m"
git -c advice.detachedHead=false clone --depth 1 https://github.com/Shopify/theme-liquid-docs $dir/

cd $out
