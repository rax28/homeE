🏠 Home-E — Smart Edge AI Home Inventory System
An intelligent home inventory system powered by Raspberry Pi, barcode scanning, computer vision, weight sensing, and cloud AI processing.
🚀 Overview
Home-E is a smart home inventory management system that:
Automatically detects fruits & vegetables using AI
Predicts freshness using a custom CNN model
Tracks grocery items via barcode scanning
Measures weight using a load cell sensor
Syncs data to a cloud backend
Works even when offline (edge caching)
The system runs on a Raspberry Pi Zero 2 W as an edge device and connects to a cloud backend for AI processing and storage.
🧠 Core Problem Solved
Manual grocery tracking is inefficient.
Expiry dates are often inaccurate for fresh produce.
Households waste food due to lack of freshness monitoring.
Inventory tracking apps rely fully on manual entry.
Home-E automates inventory tracking using hardware + AI.
🏗️ System Architecture

Camera → Edge Device (Raspberry Pi)
         ↓
Barcode Scanner
         ↓
Weight Sensor (HX711)
         ↓
Edge Processing & Caching
         ↓
Cloud Backend (Express API)
         ↓
AI Service (YOLO + Freshness CNN)
         ↓
MongoDB Database
         ↓
Frontend (Vite + React)
🧩 Hardware Components
Raspberry Pi Zero 2 W
5MP Raspberry Pi Camera Module
HX711 Load Cell (10kg)
0.96" I2C OLED Display (SSD1306)
Push Button (momentary switch)
USB Barcode Scanner
🖥️ Software Stack
🟢 Frontend
React (Vite)
TailwindCSS
Hosted on Vercel
🔵 Backend
Node.js
Express.js
MongoDB
🟣 AI Service
YOLOv8 (object detection)
ONNX Runtime (freshness model)
FastAPI
Python
🟠 Edge
Python
GPIO control
Offline caching
REST API communication
🔍 Features
📦 Inventory Management
Add items via barcode
Add items via AI detection
Manual addition option
Category-based filtering
Search functionality
🍎 AI Freshness Detection
Fruit detection using YOLOv8
Cropping via bounding box
Freshness prediction via CNN
Freshness score (0–100)
⚖️ Weight Tracking
Real-time weight reading
Auto quantity estimation
Integration with item database
🌐 Cloud Sync
Edge caching when offline
Automatic sync when internet reconnects
REST API integration