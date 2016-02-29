flfip=115.28.83.193
flfhost=root@$(flfip)
githost=git@github.com
coding=git@git.coding.net:flfwzgl/resume.git

path=server/resume

ifeq ($(m),)
	m=up
endif	

test:
	gulp

production:
	TARGET=production gulp

dev:
	git add -A
	git commit -m '$(m)'
	git push $(coding) dev:dev -f

www: production
	cd ../www &&\
		git add -A &&\
		git commit -m '$(m)';\
		git push $(coding) www:www -f

sync:
	ssh $(flfhost) 'cd $(path); git pull $(coding) www:www -f'


all: production dev www sync
bak: production dev www







