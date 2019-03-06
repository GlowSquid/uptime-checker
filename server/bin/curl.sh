
#!/bin/bash

# var1=$(curl "%{hmm}" -sSf)
# curl $var1 -sSf

curl $1 -sSf 

# echo $1

# curl https://startpim.com/ -sSf 


# curl https://glowsquid.com/ip


# STATUSCODE=$(curl -sSf /dev/stderr --write-out "%{http_code}" $1)


# STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" URL)

# if test $STATUSCODE -ne 200; then
    # error handling
# fi