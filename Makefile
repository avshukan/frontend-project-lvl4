install:
	npm install & npm --prefix ./app install ./app

start-frontend:
	npm -C app start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend
