import os
import sqlite3

def connect_db(userDataDir):
    con = sqlite3.connect(userDataDir + '/payslip.db')
    cur = con.cursor()
    return con, cur

def exec_query(userDataDir, sql):
    con, cur = connect_db(userDataDir)

    cur.execute(sql)

    con.commit()
    con.close()

def exec_select(userDataDir, sql, one=False):
    con, cur = connect_db(userDataDir)

    cur.execute(sql)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    results = (r[0] if r else None) if one else r

    con.commit()
    con.close()
    return results
