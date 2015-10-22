

# main:
# 	gulp


main:
	TARGET=main gulp

push:
	git add -A && git commit -m 'update' && git push origin temp:master -f