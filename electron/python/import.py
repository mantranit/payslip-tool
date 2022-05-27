import os
import sqlite3
import sys
import math
import pandas as pd

import utils

def import_payslip(month, path):
    read_file = pd.read_excel(path)

    table = month.replace('/', '_')
    con = sqlite3.connect(os.getcwd() + '/payslip.db')
    cur = con.cursor()
    # Truncate table
    cur.execute('''DROP TABLE IF EXISTS "{table}"'''.format(table=table))
    # Create table
    cur.execute('''CREATE TABLE IF NOT EXISTS "{table}" (
        id INTEGER NOT NULL UNIQUE,
        password TEXT, email TEXT, fullName TEXT, workingDays TEXT, leaveDays TEXT, 
        totalWorkingDays TEXT, grossSalary TEXT, responsibilityAllowance TEXT, 
        parkingAllowance TEXT, bonus TEXT, advance TEXT, otherAllowance TEXT, 
        overtimePay TEXT, totalSalary TEXT, insurance TEXT, incomeTax TEXT, 
        refund TEXT, netAmount TEXT, annualLeave TEXT, remainingLeave TEXT, 
        pdfFile TEXT, isSent INTEGER DEFAULT 0, sentDate TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
    )'''.format(table=table))

    df = read_file.reset_index()
    for index, row in df.iterrows():
        if math.isnan(row['STT']):
            continue
        password = utils.get_random_string(4)
        input_data = utils.get_data_row(row, password)
        row_value = list(input_data.values())
        cur.execute('''INSERT INTO "{table}" VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', 0, '')'''.format(table=table), row_value)
    
    # Save (commit) the changes
    con.commit()
    # We can also close the connection if we are done with it.
    # Just be sure any changes have been committed or they will be lost.
    con.close()

    print('{"data": true}')

if __name__ == '__main__':
    import_payslip(sys.argv[1], sys.argv[2])
