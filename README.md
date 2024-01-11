py -m venv venv

git clone https://github.com/diploman007/wellcards.git

venv\Scripts\activate

pip install Django==3.2 Pillow six python-dotenv djangorestframework requests celery PyJWT django-cors-headers whitenoise djangorestframework-simplejwt

cd wellcards

cd wellcards

py manage.py migrate

celery -A wellcards worker -l info -B

py manage.py runserver

To run react app:
1) Install node.js
2) cd wellcards/wellcards/mainApp
3) npm install
4) npm run preview --host
