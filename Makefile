install:
	npm install & npm --prefix ./app install ./app

lint:
	npx eslint --ext .js,.jsx .

lint-fix:
	npx eslint --ext .js,.jsx . --fix

start-frontend:
	make -C app start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main