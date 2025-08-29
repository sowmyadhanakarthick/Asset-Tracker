#!/bin/bash

# Initialize git repository
git init

# Set local git configuration for this project only (replace with your personal details)
git config user.name "MVSowmya"
git config user.email "sowmyadhanakarthick@gmail.com"

# Add all files
git add .

# Initial commit
git commit -m "Initial commit - Asset Tracker App"

echo "Git repository initialized with personal account settings"
echo "Current git config for this project:"
echo "Name: $(git config user.name)"
echo "Email: $(git config user.email)"
