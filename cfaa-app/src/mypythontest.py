import json;
import sys;

input = json.loads(sys.argv[1])
# inputs = input.get("input")
a = 0
b = 0
if(isinstance(input['first_num'], int)):
    a = input['first_num']
elif((input['first_num'].isdigit())):
    a = int(input['first_num'])

if(isinstance(input['second_num'], int)):
    b = input["second_num"]
elif((input['second_num'].isdigit())):
    b = int(input['second_num'])
# print("this is a test")

data = {'output': a+b}

print (json.dumps(data))