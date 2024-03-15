"""
Calls the different users methods
This should be called by the shell commands obsidian plugin
"""
import user
import sys, inspect


def print_funcs():
    for name, func in user.__dict__.items():
        if callable(func):
            print(name)

args = sys.argv[1:]
user_command = args[0].split(" ")
user_command, user_args = user_command[0], user_command[1:]

if user_command == "get-funcs":
    print_funcs()
    exit()

for name, func in user.__dict__.items():
    if callable(func) and name.lower().startswith(user_command.lower()):
        try:
            func(*user_args, *sys.argv[2:])
            exit(0)
        except TypeError as e:
            print(f"Type error: {e}\n\nMaybe you forgot to add cli arguments to YOUR function (arguments are passed: *sys.args[3:])")
            exit(2)

print(f"Command not found {user_command} with args {user_args} !\nAvailable commands: ")
print_funcs()
exit(2)