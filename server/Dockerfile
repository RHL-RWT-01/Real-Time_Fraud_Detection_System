# ✅ Use minimal Python image
FROM python:3.11-slim

# ✅ Prevent .pyc files and force stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ✅ Set workdir inside container
WORKDIR /app

# ✅ Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ✅ Copy your FastAPI app
COPY ./app ./app

# ✅ Expose the FastAPI port
EXPOSE 8000

# ✅ Start FastAPI, pointing to app.main
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
