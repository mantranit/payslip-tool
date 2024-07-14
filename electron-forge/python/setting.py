import json
import sys

from utils.db import exec_query, exec_select

def query(userDataDir, data):
    exec_query(userDataDir, '''CREATE TABLE IF NOT EXISTS setting (key TEXT, value TEXT)''')
    dataJson = json.loads(data)
    for key in list(dataJson.keys()):
        exist = exec_select(userDataDir, '''SELECT * FROM setting WHERE key="{key}"'''.format(key=key))
        if (exist):
            exec_query(userDataDir, '''UPDATE setting SET value = "{value}" WHERE key="{key}"'''.format(key=key, value=dataJson[key]))
        else:
            exec_query(userDataDir, '''INSERT INTO setting VALUES ("{key}", "{value}")'''.format(key=key, value=dataJson[key]))
    print('{"data": true}')

if __name__ == '__main__':
    query(sys.argv[1], sys.argv[2])
