import json
import sys

from utils.db import exec_query, exec_select

def query(data):
    exec_query('''CREATE TABLE IF NOT EXISTS setting (key TEXT, value TEXT)''')
    dataJson = json.loads(data)
    for key in list(dataJson.keys()):
        exist = exec_select('''SELECT * FROM setting WHERE key="{key}"'''.format(key=key))
        if (exist):
            exec_query('''UPDATE setting SET value = "{value}" WHERE key="{key}"'''.format(key=key, value=dataJson[key]))
        else:
            exec_query('''INSERT INTO setting VALUES ("{key}", "{value}")'''.format(key=key, value=dataJson[key]))
    print('{"data": true}')

if __name__ == '__main__':
    query(sys.argv[1])
