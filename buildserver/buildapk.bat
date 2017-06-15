set AppDir=%1
set WorkDir=%2
set GameName=%3
set NowTime=%4
set Id=%5
set Icon=%6
set RoundIcon=%7
set Splash=%8

resizeimage --input-file="%AppDir%/html/upload/%Icon%" --output-file="%WorkDir%/app/src/main/res/mipmap-hdpi/ic_launcher.png" --width=72 --height=72
resizeimage --input-file="%AppDir%/html/upload/%Icon%" --output-file="%WorkDir%/app/src/main/res/mipmap-mdpi/ic_launcher.png" --width=48 --height=48
resizeimage --input-file="%AppDir%/html/upload/%Icon%" --output-file="%WorkDir%/app/src/main/res/mipmap-xhdpi/ic_launcher.png" --width=96 --height=96
resizeimage --input-file="%AppDir%/html/upload/%Icon%" --output-file="%WorkDir%/app/src/main/res/mipmap-xxhdpi/ic_launcher.png" --width=144 --height=144
resizeimage --input-file="%AppDir%/html/upload/%Icon%" --output-file="%WorkDir%/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png" --width=192 --height=192

resizeimage --input-file="%AppDir%/html/upload/%RoundIcon%" --output-file="%WorkDir%/app/src/main/res/mipmap-hdpi/ic_launcher_round.png" --width=72 --height=72
resizeimage --input-file="%AppDir%/html/upload/%RoundIcon%" --output-file="%WorkDir%/app/src/main/res/mipmap-mdpi/ic_launcher_round.png" --width=48 --height=48
resizeimage --input-file="%AppDir%/html/upload/%RoundIcon%" --output-file="%WorkDir%/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png" --width=96 --height=96
resizeimage --input-file="%AppDir%/html/upload/%RoundIcon%" --output-file="%WorkDir%/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png" --width=144 --height=144
resizeimage --input-file="%AppDir%/html/upload/%RoundIcon%" --output-file="%WorkDir%/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png" --width=192 --height=192

resizeimage --input-file="%AppDir%/html/upload/%Splash%" --output-file="%WorkDir%/app/src/main/res/drawable/splash.png" --width=768 --height=1280

cd %WorkDir%
"%AppDir%/gradlebuild
cd %AppDir%

move /Y "%WorkDir%\app\build\outputs\apk\app-release.apk" "%AppDir%\html\apk\%GameName%_%Id%_%NowTime%.apk"

echo %GameName%

exit
