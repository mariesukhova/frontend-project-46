install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
gendiff:
	node bin/gendiff.js
test: 
	npx jest
test-coverage:
	npm test -- --coverage --coverageProvider=v8