install:
	npm install & npm --prefix ./app install ./app

run-frontend:
	npm -C app start

run-backend:
	npx start server

start:
	make run-backend & make run-frontend
