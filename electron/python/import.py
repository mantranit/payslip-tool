import os
import sqlite3
import sys
import math
import pandas as pd
from slugify import slugify

import utils

def import_payslip(path):
    con = sqlite3.connect(os.getcwd() + '/payslip.db')
    cur = con.cursor()
    # Truncate table
    cur.execute('''DROP TABLE IF EXISTS month_year''')
    # Create table
    cur.execute('''CREATE TABLE IF NOT EXISTS month_year (
        id INTEGER NOT NULL UNIQUE,
        password TEXT, email TEXT, fullName TEXT, workingDays TEXT, leaveDays TEXT, 
        totalWorkingDays TEXT, grossSalary TEXT, responsibilityAllowance TEXT, 
        parkingAllowance TEXT, bonus TEXT, advance TEXT, otherAllowance TEXT, 
        overtimePay TEXT, totalSalary TEXT, insurance TEXT, incomeTax TEXT, 
        refund TEXT, netAmount TEXT, annualLeave TEXT, remainingLeave TEXT, 
        isPdf INTEGER DEFAULT 0, isSent INTEGER DEFAULT 0,
        PRIMARY KEY("id" AUTOINCREMENT)
    )''')

    read_file = pd.read_excel(path)
    df = read_file.reset_index()
    for index, row in df.iterrows():
        if math.isnan(row['STT']):
            continue
        password = utils.get_random_string(4)
        input_data = utils.get_data_row(row, password)
        row_value = list(input_data.values())
        cur.execute("INSERT INTO month_year VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)", row_value)
    
    # Save (commit) the changes
    con.commit()
    # We can also close the connection if we are done with it.
    # Just be sure any changes have been committed or they will be lost.
    con.close()

if __name__ == '__main__':
    import_payslip(sys.argv[1])
