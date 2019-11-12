set -e

if [[ -z $1 ]]; then
	echo "Enter new version: "
	read VERSION
else
	VERSION=$1
fi

read -p "Releasing v$VERSION - are you sure? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
	echo "Releasing v$VERSION ..."

	# build 
	# VERSION=$VERSION npm run build
	rm -rf ./lib
	cross-env NODE_ENV=production babel src --out-dir lib --copy-files --ignore '**.test.js','**.md','examples/**' 

	# version
	npm version $VERSION --no-git-tag-version 

	# commit
	git add -A
	git commit -m "[build] v$VERSION"

	# publish
	npm publish --access public

	# push
	# git push origin refs/tags/v$VERSION
	git push origin master
fi
