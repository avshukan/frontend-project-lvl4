install:
	npm install & npm --prefix ./app install ./app

start-frontend:
	make -C app start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main