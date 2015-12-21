FLFHOST=root@115.28.83.193

main:
	gulp


	
update: main
ifeq ('$(m)', '')
	git add -A || true &&\
	git commit -m 'up' || true &&\
	git push origin dev:master -f &&\
	cd ../www &&\
	git add -A || true &&\
	git commit -m 'up' || true &&\
	git push origin www:gh-pages -f
else
	git add -A || true &&\
	git commit -m '$(m)' || true &&\
	git push origin dev:master -f &&\
	cd ../www &&\
	git add -A || true &&\
	git commit -m '$(m)' || true &&\
	git push origin www:gh-pages -f
endif

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











