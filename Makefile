	USER=fangaoyang
	HOST=219.223.251.93
	DIR=/home/fangaoyang/work/front-end
ALL: deploy

deploy:
	rsync -avz --delete ./ $(USER)@$(HOST):$(DIR)