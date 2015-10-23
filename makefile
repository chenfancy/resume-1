

main:
	gulp


dev: main
	git add -A && git commit -m 'update' && git push origin temp:master -f

www: 
	gulp; cd ../www; git add -A && git commit -m 'update' && git push origin temp:gh-pages -f

	
update: main
	git add -A
	git commit -m 'up'
	git push origin temp:master -f
	cd ../www
	git add -A
	git commit -m 'up'
	git push origin temp:gh-pages -f