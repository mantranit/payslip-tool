import os
import sqlite3

def exec_update(sql):
    con = sqlite3.connect(os.getcwd() + '/payslip.db')
    cur = con.cursor()

    cur.execute(sql)

    con.commit()
    con.close()

def exec_select(sql, one=False):
    con = sqlite3.connect(os.getcwd() + '/payslip.db')
    cur = con.cursor()

    cur.execute(sql)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    results = (r[0] if r else None) if one else r

    con.commit()
    con.close()
    return results
