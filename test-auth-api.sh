#!/bin/bash

# Auth API Testing Script
# Run this after starting dev server: npm run dev

API_URL="http://localhost:3000"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Testing ratee.me Auth API${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Test data
EMAIL="test@ratee.me"
PASSWORD="TestPassword123"
NAME="Test User"
COMPANY="Test Company"

# 1. Test Signup
echo -e "${BLUE}1. Testing POST /api/auth/signup${NC}"
SIGNUP_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\",
    \"name\": \"$NAME\",
    \"company_name\": \"$COMPANY\"
  }")

echo "$SIGNUP_RESPONSE" | jq .

if echo "$SIGNUP_RESPONSE" | jq -e '.success == true' > /dev/null; then
  echo -e "${GREEN}✓ Signup successful${NC}\n"
  ACCESS_TOKEN=$(echo "$SIGNUP_RESPONSE" | jq -r '.data.session.access_token')
else
  echo -e "${RED}✗ Signup failed${NC}\n"
fi

# Wait a bit for database trigger
sleep 1

# 2. Test Login
echo -e "${BLUE}2. Testing POST /api/auth/login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\"
  }")

echo "$LOGIN_RESPONSE" | jq .

if echo "$LOGIN_RESPONSE" | jq -e '.success == true' > /dev/null; then
  echo -e "${GREEN}✓ Login successful${NC}\n"
  ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.session.access_token')
else
  echo -e "${RED}✗ Login failed${NC}\n"
fi

# 3. Test Get Me (with auth)
echo -e "${BLUE}3. Testing GET /api/auth/me (authenticated)${NC}"
ME_RESPONSE=$(curl -s -X GET "$API_URL/api/auth/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$ME_RESPONSE" | jq .

if echo "$ME_RESPONSE" | jq -e '.success == true' > /dev/null; then
  echo -e "${GREEN}✓ Get me successful${NC}\n"
else
  echo -e "${RED}✗ Get me failed${NC}\n"
fi

# 4. Test Get Me (without auth - should fail)
echo -e "${BLUE}4. Testing GET /api/auth/me (unauthenticated)${NC}"
UNAUTH_RESPONSE=$(curl -s -X GET "$API_URL/api/auth/me" \
  -H "Content-Type: application/json")

echo "$UNAUTH_RESPONSE" | jq .

if echo "$UNAUTH_RESPONSE" | jq -e '.success == false' > /dev/null; then
  echo -e "${GREEN}✓ Correctly rejected unauthenticated request${NC}\n"
else
  echo -e "${RED}✗ Should have rejected unauthenticated request${NC}\n"
fi

# 5. Test Login with wrong password
echo -e "${BLUE}5. Testing POST /api/auth/login (wrong password)${NC}"
WRONG_PW_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"WrongPassword123\"
  }")

echo "$WRONG_PW_RESPONSE" | jq .

if echo "$WRONG_PW_RESPONSE" | jq -e '.success == false' > /dev/null; then
  echo -e "${GREEN}✓ Correctly rejected wrong password${NC}\n"
else
  echo -e "${RED}✗ Should have rejected wrong password${NC}\n"
fi

# 6. Test Logout
echo -e "${BLUE}6. Testing POST /api/auth/logout${NC}"
LOGOUT_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/logout" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$LOGOUT_RESPONSE" | jq .

if echo "$LOGOUT_RESPONSE" | jq -e '.success == true' > /dev/null; then
  echo -e "${GREEN}✓ Logout successful${NC}\n"
else
  echo -e "${RED}✗ Logout failed${NC}\n"
fi

# 7. Test Signup validation (weak password)
echo -e "${BLUE}7. Testing POST /api/auth/signup (weak password)${NC}"
WEAK_PW_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"test2@ratee.me\",
    \"password\": \"weak\",
    \"name\": \"Test User 2\"
  }")

echo "$WEAK_PW_RESPONSE" | jq .

if echo "$WEAK_PW_RESPONSE" | jq -e '.success == false' > /dev/null; then
  echo -e "${GREEN}✓ Correctly rejected weak password${NC}\n"
else
  echo -e "${RED}✗ Should have rejected weak password${NC}\n"
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Auth API Testing Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
