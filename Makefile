before-first-run:
	npm install
	keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

run:
	npm start
	
android:
	npm run android
