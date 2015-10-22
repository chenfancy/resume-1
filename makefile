

# main:
# 	gulp

NAME=fanlinfeng

main:
	gulp

commit:
	git add -A && git commit -m '$(m)'

push:
	git push origin temp:master -f

direct-deploy:
	git add -A && git commit -m '$(commit)' && git push origin temp:master -f
