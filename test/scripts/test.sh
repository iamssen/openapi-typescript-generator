node scripts/gen.js "$1" >/dev/null
npx jest "src/$1/test.ts"