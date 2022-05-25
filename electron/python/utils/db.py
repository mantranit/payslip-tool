import os
import sqlite3
import sys

def exec_update(sql):
    con = sqlite3.connect(os.getcwd() + '/payslip.db')
    cur = con.cursor()

    cur.execute(sql)

    con.commit()
    con.close()

if __name__ == '__main__':
    exec_update(sys.argv[1])
