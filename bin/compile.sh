# compile/compress the source code into minified version
java -jar tools/compiler.jar  --compilation_level SIMPLE_OPTIMIZATIONS --js loader/loader.js --js_output_file loader/loader-min.js
