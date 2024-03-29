install:
	npm install & npm --prefix ./app install ./app

lint:
	npx eslint --no-eslintrc --config .eslintrc.json --ext .js,.jsx .

lint-fix:
	npx eslint --no-eslintrc --config .eslintrc.json --ext .js,.jsx . --fix

start-frontend:
	make -C app start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

playwright:
	npx playwright test --project=chromium

test:
	make start & make playwright

deploy:
	git push heroku main
