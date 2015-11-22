

main:
	gulp


	
update: main
	git add -A || true &&\
	git commit -m '$(m)' || true &&\
	git push origin dev:master -f &&\
	cd ../www &&\
	git add -A || true &&\
	git commit -m '$(m)' || true &&\
	git push origin www:gh-pages -f
