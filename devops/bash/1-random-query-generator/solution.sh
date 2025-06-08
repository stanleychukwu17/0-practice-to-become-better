#!/bin/bash

array=(
"Time is what we want most but what we use worst– William Penn."
"The two most powerful warriors are patience and time– Leo Tolstoy."
"Lost time is never found again– Benjamin Franklin."
"Time flies over us, but leaves its shadow behind – Nathaniel Hawthorne."
"Do not squander time, for that is the stuff life is made of – Benjamin Franklin."
"Time is a great teacher, but unfortunately it kills all its pupils – Louis Hector Berlioz."
"You may delay, but time will not – Benjamin Franklin."
"The key is in not spending time, but in investing it – Stephen R. Covey."
"Time is the most valuable thing a man can spend – Theophrastus."
"Time is a created thing. To say ‘I don’t have time’ is like saying, ‘I don’t want to.’ – Lao Tzu"
)

array_length=$((${#array[@]}-1))

echo "${array[$RANDOM % $array_length]}"