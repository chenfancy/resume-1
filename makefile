

main:
	gulp





commit:
	git add -A && git commit -m '$(m)'

push:
	git push origin temp:master -f

up:
	git add -A && git commit -m 'update' && git push origin temp:master -f

	
deploy: main
	git add -A && git commit -m 'update' && git push origin temp:gh-pages -f && \
	cd ../www && \
	git add -A && git commit -m 'update' && git push origin temp:gh-pages -f