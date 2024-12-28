#!/bin/bash

# Set API Gateway URL
API_GATEWAY_URL="http://ad36db3775bff4ddf98251312f2a7e8a-1830202517.us-west-1.elb.amazonaws.com:8080"

# Set Authorization Token
AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGM4YTY1MmVkNTBiMmM3YmMyMTJjNyIsImlhdCI6MTczNTQwNjc0NiwiZXhwIjoxNzM2MDExNTQ2fQ.uM9GQ41e78F8IOo2KbaJ_nbilaRsfSfoiGuEdm6_MSc"

# Test Patients Endpoint
echo "🟢 Testing /api/v1/patients endpoint..."
curl -X GET "$API_GATEWAY_URL/api/v1/patients" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json"

# Test Appointments Endpoint
echo "🟢 Testing /api/v1/appointments endpoint..."
curl -X GET "$API_GATEWAY_URL/api/v1/appointments" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json"


# Test Doctor Endpoint
echo "🟢 Testing /api/v1/doctors endpoint..."
curl -X GET "$API_GATEWAY_URL/api/v1/doctors" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json"
