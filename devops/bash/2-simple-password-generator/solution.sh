#!/bin/bash

echo "Enter the length of your desired password: "
read password_length

if [ $password_length -lt 5 ]; then
  echo -e "\e[31m Password must be at least 5 characters long \e[0m"
  exit 1
elif [ $password_length -gt 35 ]; then
  echo -e "\e[31m Password must be at most 35 characters long \e[0m"
  exit 1
else
  echo -e "\e[32m Password length is valid \e[0m"
fi

pass=$(date | sha256sum | head -c $password_length)
echo -e "\e[32m Your password is: $pass \e[0m"

exit 0