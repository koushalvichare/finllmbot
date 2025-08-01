#!/bin/bash
pip install -r requirements.txt
uvicorn enhanced_fintech_main:app --host 0.0.0.0 --port $PORT
