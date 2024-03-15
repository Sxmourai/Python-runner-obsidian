# Python runner

## Description

This is a script to be called by the Obsidian shell commands plugin to quickly call some python functions to expand / transform your notes contents (or even execute random python)
You can freely use all of the code =)

## Usage

Write all your functions in user.py
All functions will be analysed in main.py, and will be executable... If you don't want that, use a class like `Utils` and put your methods there. They won't be analysed by main.py

For example (in `user.py`):
```python
def example(name):
    print(f"Hello {name} !")
```
Which would be called like this:
```sh
python main.py example hi
-> Hello hi !
```
Or, the script also tries to automatically find the best choice, so this also works:

```sh
python main.py ex hi
-> Hello hi !
```
(See that ex starts the same as example...)
but you can take more than one argument:
```python
def lot_of_args(a1, a2, *args):
    print(f"1{a1} 2{a2} Other:{args}")
```
Then:
```sh
python main.py lot hi how are you ?
-> 1hi 2how Other:('are', 'you', '?')
```
So every spaces are turned into one argument to your functions
You now have everything to easily make shell scripts in python ! 

