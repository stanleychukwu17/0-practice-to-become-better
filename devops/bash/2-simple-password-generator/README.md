# Simple password generator
- accept an input from the user, this input will be the length of the password we generate
- let the input be >= 5 and <= 35
- use the current date and pipe it to a hashing command e.g "sha256sum"
- pipe the result from the sha to a command that will "cut" the string returned from sha 
- e.g of commands are: tail, head, cut

tip: 
- use (tail|head) -c <bytes_to_cut> to cut words
- use cut -b <starting_index> <ending_index> to cut words 