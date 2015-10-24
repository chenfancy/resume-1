

main:
	gulp


	
update: main
	git commit -a -m '$(m)' || true &&\
	git push origin temp:master -f &&\
	cd ../www &&\
	git commit -a -m '$(m)' || true &&\
	git push origin temp:gh-pages -f



md:
	gulp md