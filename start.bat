@echo off
chcp 65001 >nul
title Python HTTP Server
echo Запуск локального сервера на порту 8000...

echo.
echo [94mhttp://localhost:8000[0m
echo.

start "" http://localhost:8000

echo -----------------------------------------
py -m http.server 8000

pause

