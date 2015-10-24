

main:
	gulp


	
update: main
	git add -A || true &&\
	git commit -m '$(m)' || true &&\
	git push origin temp:master -f &&\
	cd ../www &&\
	git add -A || true &&\
	git commit -m '$(m)' || true &&\
	git push origin temp:gh-pages -f
