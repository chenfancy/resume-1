

# main:
# 	gulp

NAME=fanlinfeng

main:
	gulp

commit:
	git add -A && git commit -m '$(m)'

push:
	git push origin temp:master -f

up:
	git add -A && git commit -m 'update' && git push origin temp:master -f
