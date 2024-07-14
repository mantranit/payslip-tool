import json
import sys

from utils.db import exec_select

def fetch_data(userDataDir, sql, one=False):
    results = exec_select(userDataDir, sql, one)
    print('{"data": ' + json.dumps(results) + '}')

if __name__ == '__main__':
    fetch_data(sys.argv[1], sys.argv[2])
