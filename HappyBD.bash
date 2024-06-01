#!/bin/bash

# Define the file to be modified
FILE="./index.html"
this_year=$(date +'%Y')
newAge=$(($this_year - 1998))

# <li><i class="bi bi-chevron-right"></i> <strong>Age:</strong> <span>25</span></li>

sed -i -e 's|<li><i class="bi bi-chevron-right"></i> <strong>Age:</strong> <span>\([0-9]\{0,\}\)</span></li>|<li><i class="bi bi-chevron-right"></i> <strong>Age:</strong> <span>'"${newAge}"'</span></li>|g' index.html