import sys
import importlib
import setuptools


def main():
    try:
        module_name = sys.argv[1]
    except IndexError as exc:
        print(
            'First argument should be a module name. The following modules '
            'are available:'
        )
        for name in setuptools.find_packages():
            print("  {0}".format(name))
        print()
    try:
        args = sys.argv[2:]
    except IndexError as exc:
        pass
    importlib.import_module(module_name).main(*args)


if __name__ == '__main__':
    main()
