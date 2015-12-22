flfip=115.28.83.193
flfhost=root@$(flfip)
githost=git@github.com
coding=git@git.coding.net:flfwzgl/resume.git

path=server/resume

ifeq ($(m),)
	m=up
endif


main:
	gulp

all: main dev www

dev:
	git add -A
	git commit -m $(m)
	git push $(coding) dev:dev -f

www: main
	cd ../www;\
		git add -A;\
		git commit -m $(m);\
		git push $(coding) www:www -f
	ssh $(flfhost) 'cd $(path); git pull $(coding) www:www -f'


# 只是测试
# test:
# 	@echo $(flfhost)

# update: main
# ifeq ('$(m)', '')
# 	git add -A || true &&\
# 	git commit -m 'up' || true &&\
# 	git push origin dev:master -f &&\
# 	cd ../www &&\
# 	git add -A || true &&\
# 	git commit -m 'up' || true &&\
# 	git push origin www:gh-pages -f
# else
# 	git add -A || true &&\
# 	git commit -m '$(m)' || true &&\
# 	git push origin dev:master -f &&\
# 	cd ../www &&\
# 	git add -A || true &&\
# 	git commit -m '$(m)' || true &&\
# 	git push origin www:gh-pages -f
# endif

# up: 
# ifeq ('$(m)', '')
# 	cd ../www &&\
# 	git add -A || true &&\
# 	git commit -m 'up' || true &&\
# 	git push origin www:gh-pages -f
# else
# 	cd ../www &&\
# 	git add -A || true &&\
# 	git commit -m '$(m)' || true &&\
# 	git push origin www:gh-pages -f
# endif

# up: main
# 	cd ../www &&\
# 	tar -czvf resume.tar.gz * &&\
# 	scp resume.tar.gz $(FLFHOST):server/resume &&\
# 	ssh $(FLFHOST) 'tar -xzvf /root/server/resume/resume.tar.gz && rm -rf resume.tar.gz' &&\
# 	rm -rf resume.tar.gz

# test:
# 	echo $(FLFHOST)











