import json;
import sys;

input = json.loads(sys.argv[1])
# inputs = input.get("input")
a = input['first_num']
b = input["second_num"]
# print("this is a test")

data = {'output': a+b}

print (json.dumps(data))