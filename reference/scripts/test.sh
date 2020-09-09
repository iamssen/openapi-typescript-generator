TS_NODE_PROJECT=tsconfig.script.json \
node \
-r ts-node/register \
-r tsconfig-paths/register \
scripts/gen.ts "$1" >/dev/null \
&& npx jest "src/$1/test.ts"
