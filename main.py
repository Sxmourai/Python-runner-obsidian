"""
Calls the different users methods
"""
import user
import sys

args = sys.argv[1:]

command = args[0]

if command == "get-funcs":
    for name, func in user.__dict__.items():
        if callable(func):
            print(name)
elif command == "exec":
    for name, func in user.__dict__.items():
        if callable(func) and args[1] == name:
            print(help(func))
            func()
else:
    print("Invalid command")