import json
import sys

from utils.db import exec_select

def query_fetch(sql, one=False):
    results = exec_select(sql, one)
    print('{"data": ' + json.dumps(results) + '}')

if __name__ == '__main__':
    query_fetch(sys.argv[1])
