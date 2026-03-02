# Home-E
Smart Edge AI Home Inventory System

## Overview
Home-E is an intelligent home inventory system powered by edge computing and cloud AI. It automates grocery tracking using computer vision, barcode scanning, and weight sensing to reduce food waste and eliminate manual entry.

The system runs on a Raspberry Pi Zero 2 W as an edge device and integrates with a cloud backend for AI processing and storage.

---

## Core Capabilities
- Automatic fruit and vegetable detection using YOLOv8
- Freshness prediction using a custom CNN model
- Barcode-based product identification
- Real-time weight measurement via load cell
- Offline edge caching
- Automatic cloud synchronization

---

## Problem Statement
Manual grocery tracking is inefficient. Expiry dates for fresh produce are often inaccurate. Many households waste food due to lack of freshness monitoring. Existing inventory applications rely heavily on manual input.

Home-E automates inventory tracking through hardware integration and AI processing.

---

## System Architecture

Camera  
↓  
Edge Device (Raspberry Pi)  
↓  
Barcode Scanner  
↓  
Weight Sensor (HX711)  
↓  
Edge Processing and Offline Cache  
↓  
Cloud Backend (Express API)  
↓  
AI Service (YOLO + Freshness CNN)  
↓  
MongoDB  
↓  
Frontend (React + Vite)

---

## Hardware Components
- Raspberry Pi Zero 2 W  
- Raspberry Pi Camera Module (5MP)  
- HX711 Load Cell (10kg)  
- 0.96" I2C OLED Display (SSD1306)  
- Momentary Push Button  
- USB Barcode Scanner  

---

## Software Stack

### Frontend
- React (Vite)
- TailwindCSS
- Hosted on Vercel

### Backend
- Node.js
- Express.js
- MongoDB

### AI Service
- YOLOv8 (Object Detection)
- ONNX Runtime (Freshness Model)
- FastAPI
- Python

### Edge Software
- Python
- GPIO Control
- Offline Caching Layer
- REST API Communication

---

## Features

### Inventory Management
- Add items via barcode
- Add items via AI detection
- Manual item entry
- Category-based filtering
- Search functionality

### AI Freshness Detection
- Fruit detection using YOLOv8
- Bounding box cropping
- Freshness prediction using CNN
- Freshness score (0–100)

### Weight Tracking
- Real-time weight reading
- Automatic quantity estimation
- Integration with inventory database

### Cloud Synchronization
- Offline edge caching
- Automatic sync on reconnection
- REST API integration
