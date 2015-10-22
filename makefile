

# main:
# 	gulp

NAME=fanlinfeng

main:
	gulp

commit:
	git add -A && git commit -m '$(m)'

push:
	git push origin temp:master -f

update:
	git add -A && git commit -m 'update' && git push origin temp:master -f
