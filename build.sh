npm run build
cp package-lock.json ./build
cp package.json ./build
cp -r migrations/ ./build
cp -r ./server/graphql ./build/server