

main:
	gulp


dev: main
	git add -A && git commit -m 'update' && git push origin temp:master -f

www: 
	gulp; cd ../www; git add -A && git commit -m 'update' && git push origin temp:gh-pages -f

	
update: main
	git commit -a -m '$(m)'
	git push origin temp:master -f &&\
	cd ../www &&\
	-git commit -a -m '$(m)'
	git push origin temp:gh-pages -f