FROM python:3
LABEL org.opencontainers.image.authors="kopnov.aa@edu.spbstu.ru"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
