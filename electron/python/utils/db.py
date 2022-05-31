import os
import sqlite3

def connect_db():
    con = sqlite3.connect(os.getcwd() + '/payslip.db')
    cur = con.cursor()
    return con, cur

def exec_query(sql):
    con, cur = connect_db()

    cur.execute(sql)

    con.commit()
    con.close()

def exec_select(sql, one=False):
    con, cur = connect_db()

    cur.execute(sql)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    results = (r[0] if r else None) if one else r

    con.commit()
    con.close()
    return results
