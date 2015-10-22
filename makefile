

# main:
# 	gulp


main:
	TARGET=main gulp

commit:
	git add -A && git commit -m '$(commit)'

push:
	git add -A && git commit -m '$(commit)' && git push origin temp:master -f