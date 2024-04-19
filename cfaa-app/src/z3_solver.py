import json
from z3 import *
import sys


input = json.loads(sys.argv[1])
inputs = input.get("inputs")
a = inputs["first_num"]
b = inputs["second_num"]

solver = Solver()

x = Int('x')
y = Int('y')
# solver.add(And(x, y))
solver.add(x<a)
solver.add(x>b)


result = solver.check()


if(result == unsat):
    data = {"output": "Unsat"}
else:
    data = {"output": "Sat"}



print (json.dumps(data))