import sys
import pysql

print(pysql.insertValue("login", ["username", "password"], ['"teste2"','"senha"']))