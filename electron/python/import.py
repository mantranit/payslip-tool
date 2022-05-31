import sys
import math
import pandas as pd
from utils.db import connect_db

import utils

def import_payslip(month, path):
    table = month.replace('/', '_')
    con, cur = connect_db()

    # Truncate table
    cur.execute('''DROP TABLE IF EXISTS "{table}"'''.format(table=table))
    # Create table
    cur.execute('''CREATE TABLE IF NOT EXISTS "{table}" (
        id INTEGER NOT NULL UNIQUE,
        password TEXT, email TEXT, fullName TEXT, workingDays REAL, leaveDays REAL, 
        totalWorkingDays REAL, grossSalary INTEGER, responsibilityAllowance INTEGER, 
        parkingAllowance INTEGER, bonus INTEGER, advance INTEGER, otherAllowance INTEGER, 
        overtimePay INTEGER, totalSalary INTEGER, insurance INTEGER, incomeTax INTEGER, 
        refund INTEGER, netAmount INTEGER, annualLeave REAL, remainingLeave REAL, 
        pdfFile TEXT, isSent INTEGER, sentDate TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
    )'''.format(table=table))

    for sheet_name in ['Fulltime', 'Parttime']:
        read_file = pd.read_excel(path, [sheet_name])
        df = read_file[sheet_name]
        for index, row in df.iterrows():
            if math.isnan(row.get('STT', math.nan)):
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
