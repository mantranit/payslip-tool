import json
import os
import sqlite3
import sys

def query_fetch(sql, one=False):
    con = sqlite3.connect(os.getcwd() + '/payslip.db')
    cur = con.cursor()

    cur.execute(sql)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    results = (r[0] if r else None) if one else r
    print('{"data": ' + json.dumps(results) + '}')

    con.commit()
    con.close()

if __name__ == '__main__':
    query_fetch(sys.argv[1])
