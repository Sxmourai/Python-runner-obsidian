def example(str):
    print(f"hi {str} !")
    # 
    # Utils.hey(str)

def lot_of_args(a1, a2, *args):
    print(f"1{a1} 2{a2} Other:{args}")


# Can't be executed
class Utils:
    def hey(name: str):
        print(f"Hey {name} !")