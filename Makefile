	USER=fangaoyang
	HOST=10.249.46.250
	DIR=/home/fangaoyang/work/deployment/dist
ALL: deploy

deploy:
	rsync -avz --delete dist/ $(USER)@$(HOST):$(DIR)