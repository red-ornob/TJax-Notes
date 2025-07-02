#!/usr/bin/env bash

npx nwbuild --mode=build --glob=false --cacheDir=./node_modules/nw --platform=linux --arch=x64 --outDir=out/linux-x64/ src/
tar -czf out/linux-x64.tgz -C out/ linux-x64/
rm -rf out/linux-x64/

#npx nwbuild --mode=build --glob=false --cacheDir=./node_modules/nw --platform=linux --arch=arm64 --outDir=out/linux-arm64/ src/
#tar -czf out/linux-arm64.tgz -C out/ linux-arm64/
#rm -rf out/linux-arm64/

#npx nwbuild --mode=build --glob=false --cacheDir=./node_modules/nw --platform=linux --arch=ia32 --outDir=out/linux-ia32/ src/
#tar -czf out/linux-ia32.tgz -C out/ linux-ia32/
#rm -rf out/linux-ia32/

#npx nwbuild --mode=build --glob=false --cacheDir=./node_modules/nw --platform=win --arch=x64 --outDir=out/win-x64/ src/
#zip -r out/win-x64.tgz -C out/ win-x64/
#rm -rf out/win-x64/

#npx nwbuild --mode=build --glob=false --cacheDir=./node_modules/nw --platform=win --arch=arm64 --outDir=out/win-arm64/ src/
#zip -r out/win-arm64.tgz -C out/ win-arm64/
#rm -rf out/win-arm64/

#npx nwbuild --mode=build --glob=false --cacheDir=./node_modules/nw --platform=win --arch=ia32 --outDir=out/win-ia32/ src/
#zip -r out/win-ia32.tgz -C out/ win-ia32/
#rm -rf out/win-ia32/

#npx nwbuild --mode=build --glob=false --cacheDir=./node_modules/nw --platform=osx --arch=x64 --outDir=out/osx-x64/ src/
#tar -czf out/osx-x64.tgz -C out/ osx-x64/
#rm -rf out/osx-x64/

#npx nwbuild --mode=build --glob=false --cacheDir=./node_modules/nw --platform=osx --arch=arm64 --outDir=out/osx-arm64/ src/
#tar -czf out/osx-arm64.tgz -C out/ osx-arm64/
#rm -rf out/osx-arm64/

#npx nwbuild --mode=build --glob=false --cacheDir=./node_modules/nw --platform=osx --arch=ia32 --outDir=out/osx-ia32/ src/
#tar -czf out/osx-ia32.tgz -C out/ osx-ia32/
#rm -rf out/osx-ia32/
